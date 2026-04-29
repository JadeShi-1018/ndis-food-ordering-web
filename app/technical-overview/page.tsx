import TechnicalHeroSection from "./TechnicalHeroSection";
import SystemOverviewSection from "./SystemOverviewSection ";
import WorkflowSection from "./EngineeringHighlightsSection ";
import EngineeringHighlightsSection from "./WorkflowSection ";

export default function TechnicalOverviewPage() {
  return (
    <main className="bg-white">
      <TechnicalHeroSection />
      <SystemOverviewSection />
      <WorkflowSection />
      <EngineeringHighlightsSection />
    </main>
  );
}