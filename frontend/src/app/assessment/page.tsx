import { Navigation } from "@/components/Navigation";
import { AssessmentForm } from "@/components/AssessmentForm";

export const metadata = {
  title: "AI Mental Health Assessment | MindSight",
  description: "Get personalized mental health insights based on your digital habits and lifestyle.",
};

export default function AssessmentPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-background pt-32 pb-24">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />
      
      <Navigation />

      <div className="container mx-auto px-6 relative z-10">
        <AssessmentForm />
      </div>
    </main>
  );
}
