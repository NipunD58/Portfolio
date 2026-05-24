import { T as reactExports, K as jsxRuntimeExports } from "./worker-entry-CVeMZBik.js";
import { L as Link } from "./router-DgdJY8Qm.js";
import { D as DotsBackground, B as BlueCursor } from "./DotsBackground-DF_MRUVi.js";
import "node:events";
import "node:stream";
import "node:async_hooks";
import "node:stream/web";
function useReveal() {
  reactExports.useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}
const skills = [
  { title: "Embedded Systems", desc: "I can produce functional and efficient printed circuit boards." },
  { title: "A/V and Design", desc: "I use fancy motion and techniques that makes my design more interesting than it actually is" },
  { title: "AI", desc: "I train AI models to do useful things." },
  { title: "Aerospace Engineering", desc: "I design and build aircraft and spacecraft systems." },
  { title: "Leadership", desc: "I lead teams to deliver exceptional design solutions." }
];
const awards = [
  {
    title: "INSPIRE DLEPC",
    org: "Department of Science & Technology",
    desc: "Selected for the INSPIRE grant of ₹10,000 supporting student-led STEM projects."
  },
  {
    title: "School Innovation Marathon 2024",
    org: "Atal Innovation Mission",
    desc: "Winner of the School Innovation Marathon 2024 for developiing a AI-powered agricultural solution."
  },
  {
    title: "WRO Regional",
    org: "India STEM Foundation",
    desc: "Won the WRO Regional Robotics Competition getting 2nd place."
  },
  {
    title: "Odyssey of the Mind",
    org: "Odyssey of the Mind",
    desc: "Won 1st place in the Odyssey of the Mind for creative problem solving and innovation."
  },
  {
    title: "Samsung Solve for Tomorrow ",
    org: "Samsung India",
    desc: "Got selected for the top 100 Samsung Solve for Tomorrow 2025 for developing a autonomous agentic browser"
  },
  {
    title: "Various Inter-school Competitions",
    org: "Multiple",
    desc: "Won multiple inter-school competitions in robotics and science fairs, showcasing my passion and skills in STEM."
  }
];
const communityInitiatives = [
  {
    title: "STEM Workshop Series",
    org: "Local schools",
    desc: "Hosted hands-on electronics sessions and simple build nights for junior students."
  },
  {
    title: "Robotics Club Mentorship",
    org: "School robotics club",
    desc: "Mentored teams on prototyping, sensors, and iteration for competitions."
  },
  {
    title: "Open-source Starter Kits",
    org: "GitHub",
    desc: "Shared PCB and code templates so beginners can learn by building real projects."
  },
  {
    title: "Astronomy Outreach",
    org: "Community nights",
    desc: "Organized skywatch events and light pollution awareness sessions."
  }
];
const hobbies = [
  { title: "Astrophotography", desc: "Chasing clear nights and long exposures." },
  { title: "Drone builds", desc: "Tuning frames, controllers, and telemetry." },
  { title: "Guitar", desc: "Learning riffs and recording small loops." },
  { title: "Sketching", desc: "Quick concept drawings and diagramming ideas." },
  { title: "Reading sci-fi", desc: "Stories about future tech and big questions." },
  { title: "Cycling", desc: "Resetting the brain with long rides." }
];
const clients = [
  {
    name: "MARS",
    desc: "Multifunctional Agricultural robotic system for small scale farmers.",
    year: "2025",
    role: "Solo Project",
    industry: "Agriculture · Embedded Systems",
    brief: "Designed a all in one agricultural robotic system designed for small scale farmers. It includes a autonomous tractor, a drone for aerial monitoring and a AI-powered dashboard for farm management.",
    highlights: [
      "Made a autonomous tractor using various sensors and OpenCV for navigation",
      "Made a drone using a Raspberry Pi and a camera for aerial monitoring of crops",
      "Made an AI powered dashboard using python and added various models for crop health monitoring, yield prediction and pest detection"
    ]
  },
  {
    name: "Web Star",
    desc: "Developed an AI powered agentic browser.",
    year: "2025",
    role: "Solo Project",
    industry: "AI · Software Development",
    brief: "Designed an AI-powered agentic browser for efficient web navigation.",
    highlights: [
      "End-to-end flows for browser to perfrom tasks like searching, form filling and web scraping.",
      "Real-time token consumption tracking and user control features.",
      "Implemented a user-friendly interface for seamless interaction with the AI agent."
    ]
  },
  {
    name: "Unmanned Aerial Vehicle",
    desc: "In the process of designing and building a UAV for various applications.",
    year: "On going",
    role: "Solo Project",
    industry: "Aerospace · Engineering",
    brief: "Making a dual motor fixed wing UAV, designed for applications like aerial photography, payload delivery and environmental monitoring.",
    highlights: [
      "Custom PCB design for flight control and power management",
      "Custom airframe design optimized for stability and endurance",
      "100g payload capacity"
    ]
  },
  {
    name: "AI Powered Smart Glasses",
    desc: "Made a pair of AI powered smart glasses with various features inspired by Meta Reybans.",
    year: "2024",
    role: "Solo Project",
    industry: "AI · Embedded Systems",
    brief: "Made a pair of AI powered smart glasses with features like real-time AI conversation, Image/video recording and navigation assistance. The glasses are designed to be lightweight and comfortable for everyday use.",
    highlights: [
      "Real time AI conversation using Google Gemini optimized for low latency",
      "Music playback and video recording features with local storage",
      "Navigation assistance using GPS and compass modules, providing turn-by-turn directions and location-based information."
    ]
  },
  {
    name: "Simple Flight Controller",
    desc: "A not so simple flight controller for small drones and UAVs, with a version in works for rockets as well.",
    year: "On going",
    role: "Solo Project",
    industry: "Aerospace · Engineering",
    brief: "Designed a simple yet robust flight controller for small drones and UAVs, with plans to extend it for rocket applications.",
    highlights: [
      "Real time data logging and telemetry features.",
      "Support for various sensors and actuators, making it versatile for different types of drones and UAVs.",
      "Open source design with comprehensive documentation to encourage community contributions and improvements."
    ]
  },
  {
    name: "Personal Website",
    desc: "My personal website to showcase my projects, skills and achievements.",
    year: "2026",
    role: "Solo Project",
    industry: "Web Development · Design",
    brief: "A personal website to showcase my projects, skills and achievements.",
    highlights: [
      "Modern and responsive design with a focus on usability and aesthetics.",
      "performance optimizations for fast loading times and smooth interactions.",
      "portfolio section with detailed case studies for each project, highlighting the problem, solution and impact."
    ]
  }
];
const social = [
  { label: "Photography", desc: "The Jurassic Park", href: "/photography" },
  { label: "Youtube", desc: "Random tutorials", href: "https://www.youtube.com/@NipunA10" },
  { label: "Linkedin", desc: "Serious me", href: "https://www.linkedin.com/in/nipun-dhawan-03072009nd/" },
  { label: "Instagram", desc: "Is a description needed here?", href: "https://www.instagram.com/nipun_dhawan58/" },
  { label: "Website", desc: "You are already here :/", href: "" },
  { label: "My Book", desc: "Wrote a book about some interesting topics", href: "https://www.amazon.in/s?i=digital-text&rh=p_27%3ANipun%2BDhawan&s=relevancerank&text=Nipun+Dhawan&ref=dp_byline_sr_ebooks_1" }
];
const playreelVideoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const playreelPosterUrl = new URL("../photos/DSCN4814.JPG", import.meta.url).href;
function Loader({ onDone }) {
  const [pct, setPct] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const id = setInterval(() => {
      setPct((p) => {
        if (p >= 100) {
          clearInterval(id);
          setTimeout(onDone, 350);
          return 100;
        }
        return p + 2;
      });
    }, 25);
    return () => clearInterval(id);
  }, [onDone]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-6xl text-primary", children: "N" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono-label mt-6 text-muted-foreground", children: [
      "Start ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: String(pct).padStart(2, "0") }),
      "%"
    ] })
  ] });
}
function SectionLabel({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono-label text-muted-foreground", children });
}
function NipunDhawanSite() {
  const [loading, setLoading] = reactExports.useState(true);
  const [navHidden, setNavHidden] = reactExports.useState(false);
  const [showToTop, setShowToTop] = reactExports.useState(false);
  const [openIndex, setOpenIndex] = reactExports.useState(null);
  const [openAwardIndex, setOpenAwardIndex] = reactExports.useState(null);
  const [openCommunityIndex, setOpenCommunityIndex] = reactExports.useState(null);
  const openProject = openIndex !== null ? clients[openIndex] : null;
  const openAward = openAwardIndex !== null ? awards[openAwardIndex] : null;
  const openCommunity = openCommunityIndex !== null ? communityInitiatives[openCommunityIndex] : null;
  useReveal();
  reactExports.useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const scrollingDown = y > lastY;
      setNavHidden(scrollingDown && y > 80);
      setShowToTop(y > 320);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  reactExports.useEffect(() => {
    const shouldLock = openIndex !== null || openAwardIndex !== null || openCommunityIndex !== null;
    document.body.style.overflow = shouldLock ? "hidden" : "";
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenIndex(null);
        setOpenAwardIndex(null);
        setOpenCommunityIndex(null);
        return;
      }
      if (openIndex === null) return;
      if (e.key === "ArrowRight")
        setOpenIndex((i) => i === null ? null : (i + 1) % clients.length);
      if (e.key === "ArrowLeft")
        setOpenIndex(
          (i) => i === null ? null : (i - 1 + clients.length) % clients.length
        );
    };
    if (shouldLock) {
      window.addEventListener("keydown", onKey);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, openAwardIndex, openCommunityIndex]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DotsBackground, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BlueCursor, {}),
    loading && /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { onDone: () => setLoading(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "header",
      {
        className: `fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-6 py-5 transition-[transform,opacity] duration-300 md:px-12 ${navHidden ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg", children: "N" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono-label", children: "Nipun Dhawan" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden gap-8 md:flex", children: [
            ["About", "Contact"].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `#${i.toLowerCase()}`, className: "font-mono-label hover:text-primary transition-colors", children: i }, i)),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", className: "font-mono-label hover:text-primary transition-colors", children: "Blog" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:dhawannipun58@gmail.com", className: "font-mono-label rounded-full border border-border px-4 py-2 hover:border-primary hover:text-primary transition-colors", children: "Let's talk" })
        ]
      }
    ),
    showToTop && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "aria-label": "Back to top",
        onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
        className: "fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full border border-border bg-background/80 text-primary shadow-lg backdrop-blur transition hover:border-primary md:bottom-8 md:right-8",
        children: "↑"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative flex min-h-screen items-center px-6 pt-32 md:px-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Nipun Dhawan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-8 font-display text-[14vw] leading-[0.9] md:text-[10vw]", children: [
          "making ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "text-primary", children: "cool" }),
          " stuff",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "since ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", children: "2009" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono-label absolute bottom-8 right-6 md:right-12 text-muted-foreground", children: "Scroll ↓" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "about", className: "reveal border-t border-border px-6 py-24 md:px-12 md:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-12 md:grid-cols-[1fr_2fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "About me" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-3xl leading-tight md:text-5xl", children: [
        "I'm a ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "text-primary", children: "high school student" }),
        " with a focus on electronics, aerospace and AI to make real impact."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "reveal border-t border-border py-20 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 md:px-12 mb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "What I do" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [skills, [...skills].reverse()].map((row, ri) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex shrink-0 gap-12 px-6 animate-marquee`, style: { animationDirection: ri ? "reverse" : "normal" }, children: [...row, ...row, ...row].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-6xl md:text-8xl", children: s.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-primary" })
      ] }, i)) }) }, ri)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 md:px-12 mt-16 grid gap-8 md:grid-cols-3", children: skills.slice(0, 3).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl text-primary", children: s.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: s.desc })
      ] }, s.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "reveal border-t border-border px-6 py-24 md:px-12 md:py-32", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-12 md:grid-cols-[1fr_2fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Awards" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-3xl leading-tight md:text-5xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "text-primary", children: "A growing list" }),
          " of recognitions across electronics, aerospace and AI."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Recognition" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 divide-y divide-border border-t border-border", children: awards.map((award, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpenAwardIndex(index),
            className: "group grid w-full items-center gap-4 py-6 text-left transition-colors hover:bg-muted/40 md:grid-cols-[1fr_1fr_auto]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl md:text-3xl", children: award.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: award.org }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden md:block font-mono-label opacity-0 transition-opacity group-hover:opacity-100 text-primary", children: "View ↗" })
            ]
          },
          `${award.title}-${award.org}`
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "reveal border-t border-border px-6 py-24 md:px-12 md:py-32", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-12 md:grid-cols-[1fr_2fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Projects" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-3xl leading-tight md:text-5xl", children: [
          "I like to made  ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "text-primary", children: "cool and innovative" }),
          " stuff that makes a difference."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3 border border-border", children: clients.map((c, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setOpenIndex(idx),
          className: "group bg-background/80 p-8 text-left transition-colors hover:bg-muted/40 backdrop-blur-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-4xl md:text-5xl", children: c.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono-label mt-2 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100", children: "View ↗" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: c.desc })
          ]
        },
        c.name
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "playreel", className: "reveal border-t border-border px-6 py-24 md:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto aspect-video max-w-6xl overflow-hidden rounded-2xl border border-border bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "video",
      {
        className: "h-full w-full object-cover",
        controls: true,
        playsInline: true,
        preload: "metadata",
        poster: playreelPosterUrl,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src: playreelVideoUrl, type: "video/mp4" }),
          "Your browser does not support the video tag."
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "reveal border-t border-border px-6 py-24 md:px-12 md:py-32", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Community" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-2xl text-muted-foreground", children: "A few initiatives where I share what I learn and help others build." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Initiatives" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 divide-y divide-border border-t border-border", children: communityInitiatives.map((initiative, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpenCommunityIndex(index),
            className: "group grid w-full items-center gap-4 py-6 text-left transition-colors hover:bg-muted/40 md:grid-cols-[1fr_1fr_auto]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl md:text-3xl", children: initiative.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: initiative.org }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden md:block font-mono-label opacity-0 transition-opacity group-hover:opacity-100 text-primary", children: "View ↗" })
            ]
          },
          `${initiative.title}-${initiative.org}`
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "reveal border-t border-border px-6 py-24 md:px-12 md:py-32", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-12 md:grid-cols-[1fr_2fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Hobbies" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl leading-tight md:text-5xl", children: "The things I do when I want to keep learning without a deadline." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: hobbies.map((hobby) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-2xl border border-border bg-background/80 p-6 shadow-lg backdrop-blur-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl text-primary", children: hobby.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: hobby.desc })
          ]
        },
        hobby.title
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "reveal border-t border-border px-6 py-32 md:px-12 md:py-48 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "My motto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-8 font-display text-6xl leading-[0.95] md:text-[12vw]", children: [
        "If you’re going through hell, ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "text-primary", children: " keep going." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono-label mt-8 text-muted-foreground", children: "— Winston Churchill" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { id: "contact", className: "border-t border-border px-6 py-20 md:px-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Connect" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-px bg-border border border-border md:grid-cols-3", children: social.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: s.href,
          target: "_blank",
          rel: "noreferrer",
          className: "group bg-background p-6 transition-colors hover:bg-muted/40",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl", children: s.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary transition-transform group-hover:translate-x-1", children: "↗" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono-label mt-2 text-muted-foreground", children: s.desc })
          ]
        },
        s.label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid gap-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:dhawannipun58@gmail.com", className: "mt-3 block font-display text-3xl hover:text-primary md:text-4xl", children: "dhawannipun58@gmail.com" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono-label mt-2 text-muted-foreground", children: "100% chance I read it" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono-label text-muted-foreground", children: "© Nipun Dhawan — Since 2009" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 font-mono-label text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/photography", className: "transition-colors hover:text-primary", children: "Photography" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Gurugram, Haryana" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProjectModal,
      {
        project: openProject,
        index: openIndex,
        total: clients.length,
        onClose: () => setOpenIndex(null),
        onPrev: () => setOpenIndex(
          (i) => i === null ? null : (i - 1 + clients.length) % clients.length
        ),
        onNext: () => setOpenIndex((i) => i === null ? null : (i + 1) % clients.length)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AwardModal,
      {
        award: openAward,
        onClose: () => setOpenAwardIndex(null)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommunityModal,
      {
        initiative: openCommunity,
        onClose: () => setOpenCommunityIndex(null)
      }
    )
  ] });
}
function ProjectModal({
  project,
  index,
  total,
  onClose,
  onPrev,
  onNext
}) {
  const open = !!project;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "aria-hidden": !open,
      className: `fixed inset-0 z-[90] flex items-end justify-center transition-opacity duration-300 md:items-center ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Close project",
            onClick: onClose,
            className: "absolute inset-0 bg-background/80 backdrop-blur-md"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `relative z-10 m-4 max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl transition-all duration-300 ${open ? "translate-y-0" : "translate-y-8"}`,
            children: project && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 md:p-12", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono-label text-muted-foreground", children: [
                    "Project",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: String((index ?? 0) + 1).padStart(2, "0") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-60", children: [
                      " / ",
                      String(total).padStart(2, "0")
                    ] }),
                    " · ",
                    project.year
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-6xl leading-none md:text-7xl", children: project.name })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onPrev,
                      "aria-label": "Previous project",
                      className: "font-mono-label grid h-10 w-10 place-items-center rounded-full border border-border hover:border-primary hover:text-primary transition-colors",
                      children: "←"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onNext,
                      "aria-label": "Next project",
                      className: "font-mono-label grid h-10 w-10 place-items-center rounded-full border border-border hover:border-primary hover:text-primary transition-colors",
                      children: "→"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      className: "font-mono-label ml-2 rounded-full border border-border px-4 py-2 hover:border-primary hover:text-primary transition-colors",
                      children: "Close ✕"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid gap-6 border-y border-border py-6 md:grid-cols-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono-label text-muted-foreground", children: "Role" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-xl", children: project.role })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono-label text-muted-foreground", children: "Year" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-xl", children: project.year })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono-label text-muted-foreground", children: "Industry" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-xl", children: project.industry })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono-label text-muted-foreground", children: "Brief" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-display text-2xl leading-snug md:text-3xl", children: project.brief })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono-label text-muted-foreground", children: "Highlights" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-3", children: project.highlights.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-4 border-t border-border pt-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono-label text-primary", children: [
                    "0",
                    i + 1
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg text-foreground/90", children: h })
                ] }, i)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono-label text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "← →" }),
                  " to navigate ·",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "ESC" }),
                  " to close"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onNext,
                    className: "font-mono-label rounded-full bg-primary px-5 py-2 text-primary-foreground transition-transform hover:scale-[1.02]",
                    children: "Next project →"
                  }
                )
              ] })
            ] })
          }
        )
      ]
    }
  );
}
function AwardModal({
  award,
  onClose
}) {
  const open = !!award;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "aria-hidden": !open,
      className: `fixed inset-0 z-[80] flex items-end justify-center transition-opacity duration-300 md:items-center ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Close award",
            onClick: onClose,
            className: "absolute inset-0 bg-background/80 backdrop-blur-md"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `relative z-10 m-4 w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-background shadow-2xl transition-all duration-300 ${open ? "translate-y-0" : "translate-y-8"}`,
            children: award && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 md:p-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono-label text-muted-foreground", children: "Award" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display text-4xl leading-tight md:text-5xl", children: award.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono-label mt-3 text-muted-foreground", children: award.org })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "font-mono-label rounded-full border border-border px-4 py-2 hover:border-primary hover:text-primary transition-colors",
                    children: "Close ✕"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-muted-foreground", children: award.desc })
            ] })
          }
        )
      ]
    }
  );
}
function CommunityModal({
  initiative,
  onClose
}) {
  const open = !!initiative;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "aria-hidden": !open,
      className: `fixed inset-0 z-[80] flex items-end justify-center transition-opacity duration-300 md:items-center ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Close initiative",
            onClick: onClose,
            className: "absolute inset-0 bg-background/80 backdrop-blur-md"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `relative z-10 m-4 w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-background shadow-2xl transition-all duration-300 ${open ? "translate-y-0" : "translate-y-8"}`,
            children: initiative && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 md:p-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono-label text-muted-foreground", children: "Community" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display text-4xl leading-tight md:text-5xl", children: initiative.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono-label mt-3 text-muted-foreground", children: initiative.org })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "font-mono-label rounded-full border border-border px-4 py-2 hover:border-primary hover:text-primary transition-colors",
                    children: "Close ✕"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-muted-foreground", children: initiative.desc })
            ] })
          }
        )
      ]
    }
  );
}
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(NipunDhawanSite, {});
}
export {
  Index as component
};
