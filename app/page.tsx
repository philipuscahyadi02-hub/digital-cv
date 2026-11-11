import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Builds from "@/components/Builds";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Spotlight from "@/components/Spotlight";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollFX from "@/components/ScrollFX";

export default function Home() {
  return (
    <>
      <div aria-hidden className="dot-grid pointer-events-none fixed inset-0 z-0" />
      <div aria-hidden className="ambient-glow pointer-events-none" />
      <div aria-hidden className="noise pointer-events-none fixed inset-0 z-0" />
      <Spotlight />
      <ScrollProgress />
      <ScrollFX />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Experience />
        <Builds />
        <Skills />
        <Education />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
