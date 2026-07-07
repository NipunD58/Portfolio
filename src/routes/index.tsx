import { createFileRoute } from "@tanstack/react-router";
import { NipunDhawanSite } from "@/components/NipunDhawanSite";
import { getSeo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: Index,
  head: () =>
    getSeo({
      title: "Nipun Dhawan — Making cool stuff since 2009",
      description:
        "Selectively skilled product designer with strong focus on producing high quality & impactful digital experience.",
      path: "/",
      icons: {
        icon: "/src/photos/logo.png",
        sizes: "16x16",
        type: "image/png",
      },
    }),
});

function Index() {
  return <NipunDhawanSite />;
}
