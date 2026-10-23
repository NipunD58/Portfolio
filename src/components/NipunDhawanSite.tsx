import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BlueCursor } from "./BlueCursor";
import { DotsBackground } from "./DotsBackground";
import { useReveal } from "@/hooks/use-reveal";

const skills = [
  { title: "Embedded Systems", desc: "I can produce functional and efficient printed circuit boards." },
  { title: "A/V and Design", desc: "I use fancy motion and techniques that makes my design more interesting than it actually is" },
  { title: "AI", desc: "I train AI models to do useful things." },
  { title: "Aerospace Engineering", desc: "I design and build aircraft and spacecraft systems." },
  { title: "Leadership", desc: "I lead teams to deliver exceptional design solutions." },
];

type Award = {
  title: string;
  org: string;
  desc: string;
};

type CommunityInitiative = {
  title: string;
  org: string;
  desc: string;
};

type Hobby = {
  title: string;
  desc: string;
};

const awards: Award[] = [
  { title: "World Robotics Olympiad — Nationals", org: "WRO India", desc: "Ranked 15th across India; also placed 2nd at regionals and 1st at city level, with two virtual qualifications." },
  { title: "Vivo Ignite All India Innovation Competition", org: "Vivo Ignite", desc: "Achieved All India Rank 175." },
  { title: "Global Sustainability Award ’26", org: "Global Sustainability Award", desc: "Recognised for work advancing sustainability." },
  { title: "Adaptive Spectrum Street Lighting", org: "Provisional patent filed", desc: "Filed a provisional patent for street lighting designed to minimise atmospheric scattering." },
  { title: "Ordin Inter-School Robotics Competition", org: "Ordin", desc: "Placed 2nd in NCR." },
  { title: "Youth Ideathon", org: "Youth Ideathon", desc: "Selected among the top 500 teams in India." },
  { title: "Samsung Solve for Tomorrow ’25", org: "Samsung India", desc: "Selected among the top 50." },
  { title: "Techniche ’25", org: "IIT Guwahati", desc: "Placed in the top 20." },
  { title: "Blueprint Regional Selection", org: "IIT Delhi", desc: "Selected as the youngest participant in the 16–32 age band." },
  { title: "Star Performer", org: "AISG-46", desc: "Awarded for a perfect 100/100 in the Class 10 Artificial Intelligence board examination." },
  { title: "School Innovation Marathon", org: "Atal Innovation Mission", desc: "Placed among the top 20 teams in India." },
  { title: "INSPIRE ’26", org: "Department of Science & Technology", desc: "Winner; awarded a ₹10,000 cash prize." },
  { title: "Bose Beamline Challenge", org: "Bose", desc: "Received an honourable mention." },
  { title: "Odyssey of the Mind", org: "Odyssey of the Mind", desc: "Gold in Problem 2 and silver in spontaneous." },
  { title: "NYRC Regional Robotics", org: "NYRC", desc: "1st in Robo Soccer, 2nd in Robo War, and 1st in Drone Race." },
  { title: "Asian Qualifiers Automations", org: "Asian Qualifiers", desc: "Recognised as the most contributing member." },
  { title: "Vasudha", org: "Vasudha", desc: "Advanced to Round 2." },
  { title: "Waste Chakra", org: "IIT Delhi & MCD", desc: "Placed in the top 100." },
  { title: "Skill Development Award", org: "Protsahan", desc: "Recognised for skill development." },
  { title: "Blue Tie Recipient", org: "AISG-46", desc: "Recognised by the school for contribution and achievement." },
];

const certifications = [
  { provider: "Anthropic", items: ["Claude 101", "Introduction to Model Context Protocol (MCP)", "Model Context Protocol: Advanced Topics", "AI Fluency Framework & Foundations"] },
  { provider: "Google & Google Cloud", items: ["Get Started with Google Workspace Tools Skill Badge", "Introduction to Generative AI"] },
  { provider: "IBM", items: ["Artificial Intelligence Fundamentals", "AI Foundations", "AI Agents Fundamentals", "Data Visualisation Using Python", "Python for Data Science", "Cybersecurity Fundamentals"] },
  { provider: "IIT Madras", items: ["Introduction to Data Science and AI", "Introduction to Electronic Systems"] },
  { provider: "Other programmes", items: ["Certificate of Def-Space Programme 2026 — Bharat Space Education Research Centre", "AI Agents Fundamentals — Hugging Face"] },
];

const communityInitiatives: CommunityInitiative[] = [
  { title: "Project Starlight", org: "Co-founder · nonprofit", desc: "Co-founded an initiative to educate students about space and light pollution." },
  { title: "Robo Nexus", org: "Co-founder · AISG-46 robotics club", desc: "Built a school robotics community and taught and mentored teams at its robotics bootcamp." },
  {
    title: "Robotics Club Mentorship",
    org: "Robo Nexus",
    desc: "Mentored teams on prototyping, sensors, and iteration for competitions.",
  },
  {
    title: "Open-source Hardware",
    org: "GitHub",
    desc: "Shared PCB and code templates so beginners can learn by building real projects.",
  },
  { title: "NYRC & Robotronics", org: "AISG-46", desc: "Organised national-level NYRC robotics competitions in 2024 and 2025, and Robotronics in 2025 and 2026." },
  { title: "Youth Power ’25", org: "Head of Tech & Photography", desc: "Led technology and photography across multiple initiatives." },
  { title: "School Innovation & Robotics Exhibitions", org: "AISG-46", desc: "Presented robotics at school annual day exhibitions in 2023, 2024, and 2025." },
  { title: "Leadership & Service", org: "AISG-46 and Amitasha", desc: "Served as Pavani House prefect in Class 10, House Deputy Secretary, ATL Society core member, and taught maths and English to underprivileged girls through Amitasha." },
  { title: "CBSE Board Examination Scribe", org: "2026", desc: "Served as a scribe for a student with learning disabilities during their Class 12 board examinations." },
  { title: "IAAC Outreach Coordinator", org: "International Astronomy and Astrophysics Competition", desc: "Coordinated outreach for the competition." },
  { title: "Space & Technology Communities", org: "Cygna Space Society · Hack Club · NYAS", desc: "Automation member at Cygna Space Society, Hack Club member with multiple YSWS grants over $50, and junior member of The New York Academy of Sciences." },
  { title: "TEDx AISG46 ’26", org: "IT Department", desc: "Contributed to the event's IT department." },
  { title: "Gurugram Police Summer Cyber Security Internship ’26", org: "GPCSSI", desc: "Completed the Gurugram Police Cyber Security Summer Internship." },
  { title: "JEE Jokes", org: "Published book", desc: "Wrote and published a book of JEE jokes." },
  { title: "MUN Photography", org: "JR/SR AMIGMUN", desc: "Photographed the junior and senior AMIGMUN conferences." },
  { title: "Robo Nexus mentorship", org: "Robotics Bootcamp", desc: "Taught and mentored teams during the robotics bootcamp." },

];

const hobbies: Hobby[] = [
  { title: "Astrophotography", desc: "Chasing clear nights and long exposures." },
  { title: "Painting", desc: "Making landscape water colour paintings." },
  { title: "Photography", desc: "Capturing moments and telling stories through the lens." },
  { title: "Cycling", desc: "Resetting the brain with long rides." },
];

type Project = {
  name: string;
  desc: string;
  year: string;
  role: string;
  industry: string;
  brief: string;
  highlights: string[];
};

const clients: Project[] = [
  {
    name: "MARS",
    desc: "Multifunctional Agricultural robotic system for small scale farmers.",
    year: "2025",
    role: "Solo Project",
    industry: "Agriculture · Embedded Systems",
    brief:
      "Designed a all in one agricultural robotic system designed for small scale farmers. It includes a autonomous tractor, a drone for aerial monitoring and a AI-powered dashboard for farm management.",
    highlights: [
      "Made a autonomous tractor using various sensors and OpenCV for navigation",
      "Made a drone using a Raspberry Pi and a camera for aerial monitoring of crops",
      "Made an AI powered dashboard using python and added various models for crop health monitoring, yield prediction and pest detection",
    ],
  },
  {
    name: "Web Star",
    desc: "Developed an AI powered agentic browser.",
    year: "2025",
    role: "Solo Project",
    industry: "AI · Software Development",
    brief:
      "Designed an AI-powered agentic browser for efficient web navigation.",
    highlights: [
      "End-to-end flows for browser to perfrom tasks like searching, form filling and web scraping.",
      "Real-time token consumption tracking and user control features.",
      "Implemented a user-friendly interface for seamless interaction with the AI agent.",
    ],
  },
  {
    name: "Unmanned Aerial Vehicle",
    desc: "In the process of designing and building a UAV for various applications.",
    year: "On going",
    role: "Solo Project",
    industry: "Aerospace · Engineering",
    brief:
      "Making a dual motor fixed wing UAV, designed for applications like aerial photography, payload delivery and environmental monitoring.",
    highlights: [
      "Custom PCB design for flight control and power management",
      "Custom airframe design optimized for stability and endurance",
      "100g payload capacity",
    ],
  },
  {
    name: "AI Powered Smart Glasses",
    desc: "Made a pair of AI powered smart glasses with various features inspired by Meta Reybans.",
    year: "2024",
    role: "Solo Project",
    industry: "AI · Embedded Systems",
    brief:
      "Made a pair of AI powered smart glasses with features like real-time AI conversation, Image/video recording and navigation assistance. The glasses are designed to be lightweight and comfortable for everyday use.",
    highlights: [
      "Real time AI conversation using Google Gemini optimized for low latency",
      "Music playback and video recording features with local storage",
      "Navigation assistance using GPS and compass modules, providing turn-by-turn directions and location-based information.",
    ],
  },
  {
    name: "Simple Flight Controller",
    desc: "A not so simple flight controller for small drones and UAVs, with a version in works for rockets as well.",
    year: "On going",
    role: "Solo Project",
    industry: "Aerospace · Engineering",
    brief:
      "Designed a simple yet robust flight controller for small drones and UAVs, with plans to extend it for rocket applications.",
    highlights: [
      "Real time data logging and telemetry features.",
      "Support for various sensors and actuators, making it versatile for different types of drones and UAVs.",
      "Open source design with comprehensive documentation to encourage community contributions and improvements.",
    ],
  },
  {
    name: "Personal Website",
    desc: "My personal website to showcase my projects, skills and achievements.",
    year: "2026",
    role: "Solo Project",
    industry: "Web Development · Design",
    brief:
      "A personal website to showcase my projects, skills and achievements.",
    highlights: [
      "Modern and responsive design with a focus on usability and aesthetics.",
      "performance optimizations for fast loading times and smooth interactions.",
      "portfolio section with detailed case studies for each project, highlighting the problem, solution and impact.",
    ],
  },
];

const social = [
  { label: "Photography", desc: "The Jurassic Park", href: "/photography" },
  { label: "Youtube", desc: "Random tutorials", href: "https://www.youtube.com/@NipunA10" },
  { label: "Linkedin", desc: "Serious me", href: "https://www.linkedin.com/in/nipun-dhawan-03072009nd/" },
  { label: "Instagram", desc: "Is a description needed here?", href: "https://www.instagram.com/nipun_dhawan58/" },
  { label: "Website", desc: "You are already here :/", href: "" },
  { label: "My Book", desc: "Wrote a book about some interesting topics", href: "https://www.amazon.in/s?i=digital-text&rh=p_27%3ANipun%2BDhawan&s=relevancerank&text=Nipun+Dhawan&ref=dp_byline_sr_ebooks_1" },
];

const playreelVideoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const playreelPosterUrl = new URL("../photos/DSCN4814.JPG", import.meta.url).href;

function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
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
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500">
      <div className="font-display text-6xl text-primary">N</div>
      <div className="font-mono-label mt-6 text-muted-foreground">
        Start <span className="text-primary">{String(pct).padStart(2, "0")}</span>%
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="font-mono-label text-muted-foreground">{children}</div>;
}

export function NipunDhawanSite() {
  const [loading, setLoading] = useState(true);
  const [showToTop, setShowToTop] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openAwardIndex, setOpenAwardIndex] = useState<number | null>(null);
  const [openCommunityIndex, setOpenCommunityIndex] = useState<number | null>(null);
  const openProject = openIndex !== null ? clients[openIndex] : null;
  const openAward = openAwardIndex !== null ? awards[openAwardIndex] : null;
  const openCommunity = openCommunityIndex !== null ? communityInitiatives[openCommunityIndex] : null;

  useReveal();

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setShowToTop(y > 320);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const shouldLock = openIndex !== null || openAwardIndex !== null || openCommunityIndex !== null;
    document.body.style.overflow = shouldLock ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenIndex(null);
        setOpenAwardIndex(null);
        setOpenCommunityIndex(null);
        return;
      }
      if (openIndex === null) return;
      if (e.key === "ArrowRight")
        setOpenIndex((i) => (i === null ? null : (i + 1) % clients.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) =>
          i === null ? null : (i - 1 + clients.length) % clients.length,
        );
    };
    if (shouldLock) {
      window.addEventListener("keydown", onKey);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, openAwardIndex, openCommunityIndex]);

  return (
    <div className="relative min-h-screen text-foreground">
      <DotsBackground />
      <BlueCursor />
      {loading && <Loader onDone={() => setLoading(false)} />}

      {showToTop && (
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full border border-border bg-background/80 text-primary shadow-lg backdrop-blur transition hover:border-primary md:bottom-8 md:right-8"
        >
          ↑
        </button>
      )}
      {/* Hero */}
      <main id="main-content">
      <section className="relative flex min-h-screen items-center px-6 pt-32 md:px-12">
        <div className="max-w-6xl">
          <SectionLabel>Engineering · AI · Aerospace</SectionLabel>
          <h1 className="mt-8 font-display text-[14vw] leading-[0.9] md:text-[10vw]">
            making <em className="text-primary">cool</em> stuff
            <br />
            since <span className="italic">2009</span>
          </h1>
        </div>
        <div className="font-mono-label absolute bottom-8 right-6 md:right-12 text-muted-foreground" aria-hidden="true">
          Scroll ↓
        </div>
      </section>

      {/* About */}
      <section id="about" className="reveal border-t border-border px-6 py-24 md:px-12 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <SectionLabel>About me</SectionLabel>
          <p className="font-display text-3xl leading-tight md:text-5xl">
            I'm a <em className="text-primary">high school student</em> with a focus on electronics, aerospace and AI to make real impact.
          </p>
        </div>
      </section>

      {/* What I do — marquee */}
      <section className="reveal border-t border-border py-20 overflow-hidden">
        <div className="px-6 md:px-12 mb-12">
          <SectionLabel>What I do</SectionLabel>
        </div>
        <div className="space-y-2">
          {[skills, [...skills].reverse()].map((row, ri) => (
            <div key={ri} className="flex whitespace-nowrap">
              <div className={`flex shrink-0 gap-12 px-6 animate-marquee`} style={{ animationDirection: ri ? "reverse" : "normal" }}>
                {[...row, ...row].map((s, i) => (
                  <div key={i} className="flex items-center gap-6">
                    <span className="font-display text-6xl md:text-8xl">{s.title}</span>
                    <span className="h-3 w-3 rounded-full bg-primary" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 md:px-12 mt-16 grid gap-8 md:grid-cols-3">
          {skills.slice(0, 3).map((s) => (
            <div key={s.title} className="border-t border-border pt-6">
              <h3 className="font-display text-2xl text-primary">{s.title}</h3>
              <p className="mt-3 text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="reveal border-t border-border px-6 py-24 md:px-12 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <SectionLabel>Achievements</SectionLabel>
          <p className="font-display text-3xl leading-tight md:text-5xl">
            Competition results, research, leadership, and service across robotics, science, and technology.
          </p>
        </div>

        <div className="mt-20">
          <SectionLabel>Recognition & milestones</SectionLabel>
          <div className="mt-8 divide-y divide-border border-t border-border">
            {awards.map((award, index) => (
              <button
                key={`${award.title}-${award.org}`}
                type="button"
                onClick={() => setOpenAwardIndex(index)}
                className="group grid w-full items-center gap-4 py-6 text-left transition-colors hover:bg-muted/40 md:grid-cols-[1fr_1fr_auto]"
              >
                <span className="font-display text-2xl md:text-3xl">{award.title}</span>
                <span className="text-muted-foreground">{award.org}</span>
                <span className="hidden md:block font-mono-label opacity-0 transition-opacity group-hover:opacity-100 text-primary">View ↗</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="reveal border-t border-border px-6 py-24 md:px-12 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <SectionLabel>Certifications</SectionLabel>
          <p className="font-display text-3xl leading-tight md:text-5xl">
            Coursework and credentials in <em className="text-primary">AI, data science, electronics, and security.</em>
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {certifications.map((group) => (
            <div key={group.provider} className="border-t border-border pt-6">
              <h3 className="font-display text-3xl text-primary">{group.provider}</h3>
              <ul className="mt-5 space-y-3 text-muted-foreground">
                {group.items.map((item) => <li key={item} className="flex gap-3"><span className="text-primary">↗</span><span>{item}</span></li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Research */}
      <section id="research" className="reveal border-t border-border px-6 py-24 md:px-12 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <SectionLabel>Research</SectionLabel>
          <p className="font-display text-3xl leading-tight md:text-5xl">
            Exploring how <em className="text-primary">emerging technology</em> affects people and the environment.
          </p>
        </div>
        <div className="mt-16 grid gap-px border border-border bg-border md:grid-cols-2">
          <article className="bg-background/80 p-8 md:p-10">
            <div className="font-mono-label text-muted-foreground">Published research · 1,000+ views</div>
            <h3 className="mt-5 font-display text-3xl md:text-4xl">AI and its impact on students</h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">A research paper examining the impact of artificial intelligence on students and learning. The paper has received more than 1,000 views.</p>
          </article>
          <article className="bg-background/80 p-8 md:p-10">
            <div className="font-mono-label text-muted-foreground">Provisional patent filed</div>
            <h3 className="mt-5 font-display text-3xl md:text-4xl">Adaptive spectrum street lighting</h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">A street-lighting concept designed to minimise atmospheric scattering through adaptive spectrum control.</p>
          </article>
        </div>
      </section>

      {/* Projects */}
      <section className="reveal border-t border-border px-6 py-24 md:px-12 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <SectionLabel>Projects</SectionLabel>
          <p className="font-display text-3xl leading-tight md:text-5xl">
            I’ve built <em className="text-primary">10+ projects and apps</em> across robotics, AI, electronics, and aerospace to solve practical problems.
          </p>
        </div>

        <div className="mt-16 space-y-6 pb-[30vh]">
          {clients.map((c, idx) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setOpenIndex(idx)}
              style={{ top: `calc(6rem + ${idx * 14}px)`, zIndex: idx + 1 }}
              className="group sticky flex min-h-[42vh] w-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-background p-7 text-left shadow-xl backdrop-blur-sm transition-[border-color,transform,box-shadow] duration-500 hover:border-primary hover:shadow-2xl sm:p-10 md:min-h-[46vh] md:flex-row md:items-end md:gap-12"
            >
              <span className="pointer-events-none absolute right-6 top-3 font-display text-[10rem] leading-none text-primary/[0.04] transition-transform duration-700 group-hover:scale-110 sm:right-10 sm:top-2 sm:text-[14rem]" aria-hidden="true">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="relative max-w-3xl">
                <div className="font-mono-label text-primary">{c.year} · {c.industry}</div>
                <h3 className="mt-5 font-display text-5xl leading-[0.9] md:text-7xl">{c.name}</h3>
                <p className="mt-5 max-w-2xl text-muted-foreground md:text-lg">{c.desc}</p>
              </div>
              <span className="relative mt-8 inline-flex shrink-0 items-center gap-3 font-mono-label text-foreground transition-colors group-hover:text-primary md:mb-1">
                Explore project <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">↗</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Playreel */}
      <section id="playreel" className="reveal border-t border-border px-6 py-24 md:px-12">
        <div className="mx-auto aspect-video max-w-6xl overflow-hidden rounded-2xl border border-border bg-muted">
          <video
            className="h-full w-full object-cover"
            controls
            playsInline
            preload="metadata"
            poster={playreelPosterUrl}
          >
            <source src={playreelVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Community */}
      <section className="reveal border-t border-border px-6 py-24 md:px-12 md:py-32">
        <SectionLabel>Community</SectionLabel>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          A few initiatives where I share what I learn and help others build.
        </p>
        <div className="mt-12">
          <SectionLabel>Initiatives</SectionLabel>
          <div className="mt-8 divide-y divide-border border-t border-border">
            {communityInitiatives.map((initiative, index) => (
              <button
                key={`${initiative.title}-${initiative.org}`}
                type="button"
                onClick={() => setOpenCommunityIndex(index)}
                className="group grid w-full items-center gap-4 py-6 text-left transition-colors hover:bg-muted/40 md:grid-cols-[1fr_1fr_auto]"
              >
                <span className="font-display text-2xl md:text-3xl">{initiative.title}</span>
                <span className="text-muted-foreground">{initiative.org}</span>
                <span className="hidden md:block font-mono-label opacity-0 transition-opacity group-hover:opacity-100 text-primary">View ↗</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Hobbies */}
      <section className="reveal border-t border-border px-6 py-24 md:px-12 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <SectionLabel>Hobbies</SectionLabel>
          <p className="font-display text-3xl leading-tight md:text-5xl">
            The things I do when I want to keep learning without a deadline.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hobbies.map((hobby) => (
            <div
              key={hobby.title}
              className="rounded-2xl border border-border bg-background/80 p-6 shadow-lg backdrop-blur-sm"
            >
              <h3 className="font-display text-2xl text-primary">{hobby.title}</h3>
              <p className="mt-3 text-muted-foreground">{hobby.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Motto */}
      <section className="reveal border-t border-border px-6 py-32 md:px-12 md:py-48 text-center">
        <SectionLabel>My motto</SectionLabel>
        <h2 className="mt-8 font-display text-6xl leading-[0.95] md:text-[12vw]">
          If you’re going through hell, <em className="text-primary"> keep going.</em>
          <br />
        </h2>
        <div className="font-mono-label mt-8 text-muted-foreground">— Winston Churchill</div>
      </section>

      {/* Connect / Footer */}
      <footer id="contact" className="border-t border-border px-6 py-20 md:px-12">
        <SectionLabel>Connect</SectionLabel>
        <div className="mt-10 grid gap-px bg-border border border-border md:grid-cols-3">
          {social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="group bg-background p-6 transition-colors hover:bg-muted/40"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl">{s.label}</span>
                <span className="text-primary transition-transform group-hover:translate-x-1">↗</span>
              </div>
              <div className="font-mono-label mt-2 text-muted-foreground">{s.desc}</div>
            </a>
          ))}
        </div>

        <div className="mt-16 grid gap-12">
          <div>
            <SectionLabel>Email</SectionLabel>
            <a href="mailto:dhawannipun58@gmail.com" className="mt-3 block font-display text-3xl hover:text-primary md:text-4xl">
              dhawannipun58@gmail.com
            </a>
            <div className="font-mono-label mt-2 text-muted-foreground">100% chance I read it</div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <div className="font-mono-label text-muted-foreground">© Nipun Dhawan — Since 2009</div>
          <div className="flex items-center gap-6 font-mono-label text-muted-foreground">
            <Link to="/photography" className="transition-colors hover:text-primary">
              Photography
            </Link>
            <Link to="/privacy" className="transition-colors hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-primary">
              Terms of Use
            </Link>
            <span>Gurugram, Haryana</span>
          </div>
        </div>
      </footer>
      </main>

      <ProjectModal
        project={openProject}
        index={openIndex}
        total={clients.length}
        onClose={() => setOpenIndex(null)}
        onPrev={() =>
          setOpenIndex((i) =>
            i === null ? null : (i - 1 + clients.length) % clients.length,
          )
        }
        onNext={() =>
          setOpenIndex((i) => (i === null ? null : (i + 1) % clients.length))
        }
      />
      <AwardModal
        award={openAward}
        onClose={() => setOpenAwardIndex(null)}
      />
      <CommunityModal
        initiative={openCommunity}
        onClose={() => setOpenCommunityIndex(null)}
      />
    </div>
  );
}

function ProjectModal({
  project,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  project: Project | null;
  index: number | null;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const open = !!project;
  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[90] flex items-end justify-center transition-opacity duration-300 md:items-center ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close project"
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
      />

      {/* Panel */}
      <div
        className={`relative z-10 m-4 max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl transition-all duration-300 ${open ? "translate-y-0" : "translate-y-8"
          }`}
      >
        {project && (
          <div className="p-8 md:p-12">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="font-mono-label text-muted-foreground">
                  Project{" "}
                  <span className="text-primary">
                    {String((index ?? 0) + 1).padStart(2, "0")}
                  </span>
                  <span className="opacity-60"> / {String(total).padStart(2, "0")}</span>
                  {" · "}
                  {project.year}
                </div>
                <h2 className="mt-4 font-display text-6xl leading-none md:text-7xl">
                  {project.name}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Previous project"
                  className="font-mono-label grid h-10 w-10 place-items-center rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Next project"
                  className="font-mono-label grid h-10 w-10 place-items-center rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                >
                  →
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="font-mono-label ml-2 rounded-full border border-border px-4 py-2 hover:border-primary hover:text-primary transition-colors"
                >
                  Close ✕
                </button>
              </div>
            </div>

            <div className="mt-10 grid gap-6 border-y border-border py-6 md:grid-cols-3">
              <div>
                <div className="font-mono-label text-muted-foreground">Role</div>
                <div className="mt-2 font-display text-xl">{project.role}</div>
              </div>
              <div>
                <div className="font-mono-label text-muted-foreground">Year</div>
                <div className="mt-2 font-display text-xl">{project.year}</div>
              </div>
              <div>
                <div className="font-mono-label text-muted-foreground">Industry</div>
                <div className="mt-2 font-display text-xl">{project.industry}</div>
              </div>
            </div>

            <div className="mt-10">
              <div className="font-mono-label text-muted-foreground">Brief</div>
              <p className="mt-4 font-display text-2xl leading-snug md:text-3xl">
                {project.brief}
              </p>
            </div>

            <div className="mt-10">
              <div className="font-mono-label text-muted-foreground">Highlights</div>
              <ul className="mt-4 space-y-3">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex gap-4 border-t border-border pt-3">
                    <span className="font-mono-label text-primary">0{i + 1}</span>
                    <span className="text-lg text-foreground/90">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 flex items-center justify-between">
              <span className="font-mono-label text-muted-foreground">
                <span className="text-primary">← →</span> to navigate ·{" "}
                <span className="text-primary">ESC</span> to close
              </span>
              <button
                type="button"
                onClick={onNext}
                className="font-mono-label rounded-full bg-primary px-5 py-2 text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                Next project →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AwardModal({
  award,
  onClose,
}: {
  award: Award | null;
  onClose: () => void;
}) {
  const open = !!award;
  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[80] flex items-end justify-center transition-opacity duration-300 md:items-center ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
    >
      <button
        type="button"
        aria-label="Close award"
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
      />

      <div
        className={`relative z-10 m-4 w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-background shadow-2xl transition-all duration-300 ${open ? "translate-y-0" : "translate-y-8"
          }`}
      >
        {award && (
          <div className="p-8 md:p-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="font-mono-label text-muted-foreground">Award</div>
                <h3 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
                  {award.title}
                </h3>
                <div className="font-mono-label mt-3 text-muted-foreground">{award.org}</div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="font-mono-label rounded-full border border-border px-4 py-2 hover:border-primary hover:text-primary transition-colors"
              >
                Close ✕
              </button>
            </div>
            <p className="mt-6 text-muted-foreground">
              {award.desc}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function CommunityModal({
  initiative,
  onClose,
}: {
  initiative: CommunityInitiative | null;
  onClose: () => void;
}) {
  const open = !!initiative;
  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[80] flex items-end justify-center transition-opacity duration-300 md:items-center ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
    >
      <button
        type="button"
        aria-label="Close initiative"
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
      />

      <div
        className={`relative z-10 m-4 w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-background shadow-2xl transition-all duration-300 ${open ? "translate-y-0" : "translate-y-8"
          }`}
      >
        {initiative && (
          <div className="p-8 md:p-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="font-mono-label text-muted-foreground">Community</div>
                <h3 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
                  {initiative.title}
                </h3>
                <div className="font-mono-label mt-3 text-muted-foreground">{initiative.org}</div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="font-mono-label rounded-full border border-border px-4 py-2 hover:border-primary hover:text-primary transition-colors"
              >
                Close ✕
              </button>
            </div>
            <p className="mt-6 text-muted-foreground">
              {initiative.desc}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
