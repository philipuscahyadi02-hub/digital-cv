import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Spotlight from "@/components/Spotlight";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      <div aria-hidden className="noise pointer-events-none fixed inset-0 z-0" />
      <Spotlight />
      <ScrollProgress />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
