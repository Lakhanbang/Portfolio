import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Dock from "@/components/Dock";
import Contact from "@/components/Contact";
import Achievements from "@/components/Achievements";
import SplashCursor from "@/components/SplashCursor";
import TargetCursor from "@/components/TargetCursor";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen text-white">
      <TargetCursor />
      <SplashCursor />
      <Hero />
      <Projects />
      <Achievements />
      <Skills />
      <Timeline />
      <Dock />
      <Contact />
    </main>
  );
}
