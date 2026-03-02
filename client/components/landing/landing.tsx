import { Navbar } from "./navbar";
import { Hero } from "./hero";
import { StatsStrip } from "./stats-strip";
import { Features } from "./features";
import { HowItWorks } from "./how-it-works";
import { DeveloperShowcase } from "./developer-showcase";
import { CallToAction } from "./cta";
import { Footer } from "./footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsStrip />
        <Features />
        <HowItWorks />
        <DeveloperShowcase />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
