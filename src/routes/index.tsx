import { createFileRoute } from "@tanstack/react-router";
import { NipunDhawanSite } from "@/components/NipunDhawanSite";
import { getSeo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: Index,
  head: () =>
    getSeo({
      title: "Nipun Dhawan — Making good shit since 2009",
      description:
        "Selectively skilled product designer with strong focus on producing high quality & impactful digital experience.",
      path: "/",
    }),
});

function Index() {
  return <NipunDhawanSite />;
}
