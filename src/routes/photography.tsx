import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { BlueCursor } from "@/components/BlueCursor";
import { DotsBackground } from "@/components/DotsBackground";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getSeo } from "@/lib/seo";

type Photo = {
  title: string;
  displayTitle?: string;
  location?: string;
  year?: string;
  src?: string;
  alt?: string;
  expectedOrientation?: "portrait" | "landscape";
  fallbackRotate?: "cw" | "ccw";
};

const photoFiles = [
  "DSCN0978.JPG",
  "DSCN0988.JPG",
  "DSCN1074.JPG",
  "DSCN4814.JPG",
  "DSCN4871.JPG",
  "DSCN4959.JPG",
  "DSCN4962.JPG",
  "DSCN4963.JPG",
  "DSCN1003.JPG",
];

const photoModules = import.meta.glob("../photos/*.{jpg,JPG,jpeg,JPEG,png,webp}", {
  eager: true,
  import: "default",
});

const photos: Photo[] = photoFiles.map((file, index) => {
  const title = file.replace(/\.[^/.]+$/, "");
  const src = photoModules[`../photos/${file}`] as string | undefined;
  const expectedOrientation =
    title === "DSCN4814" || title === "DSCN4871" ? "portrait" : undefined;
  const fallbackRotate = expectedOrientation === "portrait" ? "ccw" : undefined;
  const displayIndex = String(index + 1).padStart(2, "0");

  return {
    title,
    displayTitle: `Photo ${displayIndex}`,
    src,
    alt: `Photograph ${title}`,
    expectedOrientation,
    fallbackRotate,
  };
});

const getExifOrientation = (buffer: ArrayBuffer) => {
  const view = new DataView(buffer);
  if (view.byteLength < 2 || view.getUint16(0, false) !== 0xffd8) return null;

  let offset = 2;
  while (offset + 4 < view.byteLength) {
    if (view.getUint8(offset) !== 0xff) break;
    const marker = view.getUint8(offset + 1);
    if (marker === 0xda) break; // Start of Scan
    const size = view.getUint16(offset + 2, false);
    if (marker === 0xe1) {
      const exifStart = offset + 4;
      if (view.getUint32(exifStart, false) !== 0x45786966) return null; // "Exif"
      const tiffStart = exifStart + 6;
      const little = view.getUint16(tiffStart, false) === 0x4949;
      const ifdOffset = view.getUint32(tiffStart + 4, little);
      const ifdStart = tiffStart + ifdOffset;
      const entries = view.getUint16(ifdStart, little);
      for (let i = 0; i < entries; i += 1) {
        const entryOffset = ifdStart + 2 + i * 12;
        const tag = view.getUint16(entryOffset, little);
        if (tag === 0x0112) {
          return view.getUint16(entryOffset + 8, little);
        }
      }
      return null;
    }
    offset += 2 + size;
  }
  return null;
};

const decodeImage = (blob: Blob) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(blob);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to decode image"));
    };
    img.src = objectUrl;
  });

const rotateImage = async (blob: Blob, orientation: number) => {
  const img = await decodeImage(blob);
  const width = img.naturalWidth;
  const height = img.naturalHeight;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  if (orientation === 6 || orientation === 8) {
    canvas.width = height;
    canvas.height = width;
  } else {
    canvas.width = width;
    canvas.height = height;
  }

  switch (orientation) {
    case 3:
      ctx.translate(width, height);
      ctx.rotate(Math.PI);
      break;
    case 6:
      ctx.translate(height, 0);
      ctx.rotate(Math.PI / 2);
      break;
    case 8:
      ctx.translate(0, width);
      ctx.rotate(-Math.PI / 2);
      break;
    default:
      break;
  }

  ctx.drawImage(img, 0, 0);

  const correctedBlob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, blob.type || "image/jpeg", 0.92),
  );

  return correctedBlob ? URL.createObjectURL(correctedBlob) : null;
};

const normalizeImageOrientation = async (
  src: string,
  trackUrl: (url: string) => void,
  expectedOrientation?: Photo["expectedOrientation"],
  fallbackRotate?: Photo["fallbackRotate"],
) => {
  const response = await fetch(src);
  if (!response.ok) {
    console.error("Failed to load image for orientation correction", src);
    return src;
  }
  const blob = await response.blob();
  if (blob.type !== "image/jpeg") return src;

  const header = await blob.slice(0, 256 * 1024).arrayBuffer();
  const exifOrientation = getExifOrientation(header);

  // Avoid double-rotation: some browsers already apply EXIF orientation to decoded pixels.
  // For orientations that swap dimensions (6/8), only rotate if the decoded pixels still look sideways.
  try {
    if (exifOrientation === 6 || exifOrientation === 8) {
      const img = await decodeImage(blob);
      const isDecodedPortrait = img.naturalHeight >= img.naturalWidth;
      if (isDecodedPortrait) return src;
    }
  } catch {
    // If we can't decode, fall through to rotation attempt.
  }

  // Prefer EXIF correction when available.
  let orientationToApply: number | null =
    exifOrientation && exifOrientation !== 1 ? exifOrientation : null;

  // Fallback: for known portrait shots that render sideways, rotate if decoded pixels are landscape.
  if (!orientationToApply && expectedOrientation === "portrait") {
    try {
      const img = await decodeImage(blob);
      if (img.naturalWidth > img.naturalHeight) {
        orientationToApply = fallbackRotate === "ccw" ? 8 : 6;
      }
    } catch (error) {
      console.error("Failed to inspect image for orientation", error);
    }
  }

  if (!orientationToApply) return src;

  try {
    const correctedUrl = await rotateImage(blob, orientationToApply);
    if (correctedUrl) {
      trackUrl(correctedUrl);
      return correctedUrl;
    }
  } catch (error) {
    console.error("Failed to correct image orientation", error);
  }

  return src;
};

function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="font-mono-label text-muted-foreground">{children}</div>;
}

export const Route = createFileRoute("/photography")({
  component: PhotographyPage,
  head: () =>
    getSeo({
      title: "Photography — Nipun Dhawan",
      description: "A running collection of photographs.",
      path: "/photography",
    }),
});

function PhotographyPage() {
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null);
  const [displayPhotos, setDisplayPhotos] = useState<Photo[]>(photos);

  useEffect(() => {
    let isActive = true;
    const objectUrls: string[] = [];

    const normalizePhotos = async () => {
      const normalized = await Promise.all(
        photos.map(async (photo) => {
          if (!photo.src) return photo;
          const normalizedSrc = await normalizeImageOrientation(
            photo.src,
            (url) => objectUrls.push(url),
            photo.expectedOrientation,
            photo.fallbackRotate,
          );
          return { ...photo, src: normalizedSrc };
        }),
      );

      if (isActive) setDisplayPhotos(normalized);
    };

    void normalizePhotos();

    return () => {
      isActive = false;
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  useEffect(() => {
    if (!activePhoto) return;
    const updated = displayPhotos.find((photo) => photo.title === activePhoto.title);
    if (updated && updated.src !== activePhoto.src) {
      setActivePhoto(updated);
    }
  }, [activePhoto, displayPhotos]);

  const openPhoto = (photo: Photo) => {
    if (!photo.src) return;
    setActivePhoto(photo);
  };

  const isLightboxOpen = !!activePhoto?.src;

  return (
    <div className="relative min-h-screen text-foreground">
      <DotsBackground />
      <BlueCursor />

      <header className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-12">
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg">
            N
          </div>
          <span className="font-mono-label">Nipun Dhawan</span>
        </div>
        <Link
          to="/"
          className="font-mono-label rounded-full border border-border px-4 py-2 transition-colors hover:border-primary hover:text-primary"
        >
          Back home
        </Link>
      </header>

      <section className="relative flex min-h-screen items-center px-6 pt-32 md:px-12">
        <div className="max-w-5xl">
          <SectionLabel>Photography</SectionLabel>
          <h1 className="mt-8 font-display text-[12vw] leading-[0.9] md:text-[8vw]">
            moments in <em className="text-primary">light</em>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            A running collection of photographs.
          </p>
        </div>
      </section>

      <section className="border-t border-border px-6 py-24 md:px-12 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <SectionLabel>Selected shots</SectionLabel>
          <p className="font-display text-3xl leading-tight md:text-5xl">
            Each frame is a study in atmosphere, texture, and the small details that make a place
            feel alive.
          </p>
        </div>

        <div className="mt-10 mb-2">
          <span className="font-mono-label text-xs text-muted-foreground">{photos.length} photographs in the archive</span>
        </div>

        <div className="mt-6 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {displayPhotos.map((photo, index) => (
            <div key={`${photo.title}-${index}`} className="group bg-background/80 p-6 backdrop-blur-sm">
              <div className="aspect-[4/5] overflow-hidden rounded-xl border border-border bg-muted/40 relative">
                {photo.src ? (
                  <button
                    type="button"
                    onClick={() => openPhoto(photo)}
                    aria-label={`Open ${photo.displayTitle ?? photo.title}`}
                    className="h-full w-full cursor-zoom-in focus:outline-none"
                  >
                    {/* Index badge */}
                    <span className="absolute top-3 left-3 z-10 font-mono-label text-[10px] rounded-full bg-background/70 border border-border px-2 py-0.5 text-muted-foreground backdrop-blur-sm">
                      {photo.displayTitle ?? photo.title}
                    </span>
                    <img
                      src={photo.src}
                      alt={photo.alt ?? photo.title}
                      className="photo-image h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </button>
                ) : (
                  <div className="flex h-full items-center justify-center text-center text-muted-foreground">
                    <span className="font-mono-label">Add photograph</span>
                  </div>
                )}
              </div>
              <div className="mt-5">
                <div className="font-display text-2xl text-foreground">{photo.displayTitle ?? photo.title}</div>
                {(photo.location || photo.year) && (
                  <div className="font-mono-label mt-2 text-muted-foreground">
                    {[photo.location, photo.year].filter(Boolean).join(" · ")}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border px-6 py-16 md:px-12">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="font-mono-label text-muted-foreground">© Nipun Dhawan — Photography</div>
          <Link to="/" className="font-mono-label text-muted-foreground transition-colors hover:text-primary">
            Back to home
          </Link>
        </div>
      </footer>

      <Dialog
        open={isLightboxOpen}
        onOpenChange={(open) => {
          if (!open) setActivePhoto(null);
        }}
      >
        <DialogContent className="w-[min(92vw,1200px)] max-w-[92vw] border-border bg-background/95 p-0 overflow-hidden">
          {activePhoto && (
            <div className="flex flex-col">
              <div className="border-b border-border px-6 py-5 flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono-label text-muted-foreground">Photograph</div>
                  <div className="mt-2 font-display text-2xl text-foreground">{activePhoto.displayTitle ?? activePhoto.title}</div>
                  {(activePhoto.location || activePhoto.year) && (
                    <div className="font-mono-label mt-2 text-muted-foreground">
                      {[activePhoto.location, activePhoto.year].filter(Boolean).join(" · ")}
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-black/90 p-4 md:p-6">
                <img
                  src={activePhoto.src ?? ""}
                  alt={activePhoto.alt ?? activePhoto.title}
                  className="photo-image max-h-[75vh] w-full object-contain"
                  loading="eager"
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
