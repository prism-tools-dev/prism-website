import { Playground } from "@/components/playground/Playground";
import { HeroSection } from "@/components/HeroSection";
import { StatusStates } from "@/components/StatusStates";
import { LanguageStrip } from "@/components/LanguageStrip";
import { CTASection } from "@/components/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      {/* Interactive playground */}
      <section className="relative mx-auto w-full max-w-6xl px-6 pb-24">
        <Playground />
      </section>

      {/* 4 status states */}
      <StatusStates />

      {/* Language support */}
      <LanguageStrip />

      {/* CTA */}
      <CTASection />
    </div>
  );
}
