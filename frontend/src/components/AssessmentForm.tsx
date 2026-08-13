"use client";
import { useState } from "react";
import { ResultsDashboard } from "./ResultsDashboard";

type AssessmentData = {
  age: number;
  gender: string;
  country: string;
  academic_level: string;
  most_used_platform: string;
  purpose_of_use: string;
  avg_daily_usage_hours: number;
  daily_unlocks: number;
  study_hours: number;
  physical_activity_hours: number;
  sleep_hours_per_night: number;
  stress_level: string;
};

export function AssessmentForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<AssessmentData>({
    age: 25,
    gender: "Male",
    country: "USA",
    academic_level: "Undergraduate",
    most_used_platform: "Instagram",
    purpose_of_use: "Entertainment",
    avg_daily_usage_hours: 4.0,
    daily_unlocks: 50,
    study_hours: 6.0,
    physical_activity_hours: 1.0,
    sleep_hours_per_night: 7.0,
    stress_level: "Medium",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const numberFields = ["age", "avg_daily_usage_hours", "daily_unlocks", "study_hours", "physical_activity_hours", "sleep_hours_per_night"];
    setFormData((prev) => ({
      ...prev,
      [name]: numberFields.includes(name) ? Number(value) : value,
    }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "https://mental-health-tracker-o9bb.onrender.com";
      const response = await fetch(`${backendUrl}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to get prediction from backend.");

      const data = await response.json();
      const score = data.predicted_mental_health_score;
      
      // Fetch AI Insights
      try {
        const aiResponse = await fetch("/api/analyze-assessment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formData, score }),
        });
        if (aiResponse.ok) {
          const aiData = await aiResponse.json();
          setAiInsight(aiData.insight);
        }
      } catch (aiErr) {
        console.error("AI Insight fetch failed", aiErr);
      }
      
      setResult(score);
      setIsSubmitting(false);
      
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the prediction server.");
      setIsSubmitting(false);
    }
  };

  if (result !== null) {
    return <ResultsDashboard score={result} data={formData} aiInsight={aiInsight} onReset={() => { setResult(null); setAiInsight(null); }} />;
  }

  const steps = [
    { id: 1, title: "Demographics", icon: "person" },
    { id: 2, title: "Digital Habits", icon: "smartphone" },
    { id: 3, title: "Lifestyle", icon: "favorite" },
    { id: 4, title: "Current State", icon: "drive_file_rename" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-start justify-center pt-24 pb-32 px-margin-mobile">
      {/* Vertical Stepper Sidebar */}
      <aside className="hidden md:flex flex-col gap-8 w-64 sticky top-32">
        <div className="flex flex-col gap-6">
          {steps.map((step, idx) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div key={step.id} className="relative">
                <div className={`flex items-center gap-4 group transition-all duration-300 ${!isActive && !isCompleted ? 'opacity-40' : 'opacity-100'}`}>
                  <div className={`step-indicator w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg 
                    ${isActive ? 'bg-primary text-on-primary' : isCompleted ? 'bg-secondary text-on-secondary' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: isActive || isCompleted ? "'FILL' 1" : "'FILL' 0" }}>
                      {isCompleted ? 'check' : step.icon}
                    </span>
                  </div>
                  <div>
                    <p className={`font-label-caps text-label-caps ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>Step {step.id}</p>
                    <p className="font-bold text-on-surface">{step.title}</p>
                  </div>
                </div>
                {idx < steps.length - 1 && (
                  <div className="w-px h-8 bg-outline-variant/30 ml-5 my-2"></div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Form Container */}
      <section className="w-full max-w-2xl relative overflow-hidden">
        <form onSubmit={handleSubmit} className="w-full relative min-h-[500px]">
          
          {/* Step 1: Demographics */}
          <div className={`w-full transition-all duration-500 cubic-bezier-transition ${currentStep === 1 ? 'relative opacity-100 translate-x-0 z-10' : 'absolute top-0 left-0 opacity-0 -translate-x-full z-0 pointer-events-none'}`}>
            <div className="glass-card rounded-[32px] p-8 md:p-12 shadow-xl">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Tell us about yourself</h2>
              <p className="text-on-surface-variant mb-10">This helps us baseline your profile against demographic mental health markers.</p>
              
              <div className="space-y-10">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-on-surface">Age</label>
                    <span className="text-primary font-bold text-xl">{formData.age}</span>
                  </div>
                  <input type="range" name="age" value={formData.age} onChange={handleChange} min="10" max="100" className="w-full accent-primary" />
                </div>

                <div className="space-y-4">
                  <label className="font-bold text-on-surface block">Gender</label>
                  <div className="flex flex-wrap gap-4">
                    {["Male", "Female", "Non-binary"].map((g) => (
                      <label key={g} className="flex-1 min-w-[120px] cursor-pointer">
                        <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleChange} className="hidden peer" />
                        <div className="p-4 border border-outline-variant/30 rounded-2xl text-center peer-checked:bg-primary-container peer-checked:text-on-primary-container peer-checked:border-primary transition-all">
                          {g}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="font-bold text-on-surface block">Country</label>
                  <select name="country" value={formData.country} onChange={handleChange} className="w-full bg-white/50 border border-outline-variant/30 rounded-full px-6 py-4 text-on-surface focus:outline-none focus:border-primary transition-all appearance-none">
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="India">India</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-12 flex justify-end">
                <button type="button" onClick={nextStep} className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
                  Continue <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Step 2: Digital Habits */}
          <div className={`w-full transition-all duration-500 cubic-bezier-transition ${currentStep === 2 ? 'relative opacity-100 translate-x-0 z-10' : currentStep < 2 ? 'absolute top-0 left-0 opacity-0 translate-x-full z-0 pointer-events-none' : 'absolute top-0 left-0 opacity-0 -translate-x-full z-0 pointer-events-none'}`}>
            <div className="glass-card rounded-[32px] p-8 md:p-12 shadow-xl">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Digital Habits</h2>
              <p className="text-on-surface-variant mb-10">Your interaction with technology impacts your dopamine levels and stress.</p>
              
              <div className="space-y-10">
                <div className="space-y-4">
                  <label className="font-bold text-on-surface block">Primary Platform</label>
                  <select name="most_used_platform" value={formData.most_used_platform} onChange={handleChange} className="w-full bg-white/50 border border-outline-variant/30 rounded-full px-6 py-4 text-on-surface focus:outline-none focus:border-primary transition-all appearance-none">
                    {["Instagram", "TikTok", "Facebook", "Twitter", "LinkedIn", "YouTube", "Snapchat", "WhatsApp", "Other"].map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-on-surface">Daily Screen Time (Hours)</label>
                    <span className="text-primary font-bold text-xl">{formData.avg_daily_usage_hours}</span>
                  </div>
                  <input type="range" name="avg_daily_usage_hours" value={formData.avg_daily_usage_hours} onChange={handleChange} min="0" max="24" step="0.5" className="w-full accent-primary" />
                </div>

                <div className="space-y-4">
                  <label className="font-bold text-on-surface block">Estimated Daily Unlocks</label>
                  <input type="number" name="daily_unlocks" value={formData.daily_unlocks} onChange={handleChange} className="w-full bg-white/50 border border-outline-variant/30 rounded-full px-6 py-4 text-on-surface focus:outline-none focus:border-primary transition-all" />
                </div>
              </div>
              
              <div className="mt-12 flex justify-between items-center">
                <button type="button" onClick={prevStep} className="text-on-surface-variant font-bold flex items-center gap-2 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">arrow_back</span> Back
                </button>
                <button type="button" onClick={nextStep} className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
                  Continue <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Step 3: Lifestyle */}
          <div className={`w-full transition-all duration-500 cubic-bezier-transition ${currentStep === 3 ? 'relative opacity-100 translate-x-0 z-10' : currentStep < 3 ? 'absolute top-0 left-0 opacity-0 translate-x-full z-0 pointer-events-none' : 'absolute top-0 left-0 opacity-0 -translate-x-full z-0 pointer-events-none'}`}>
            <div className="glass-card rounded-[32px] p-8 md:p-12 shadow-xl">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Daily Lifestyle</h2>
              <p className="text-on-surface-variant mb-10">Foundation blocks of mental well-being: movement, sleep, and focus.</p>
              
              <div className="space-y-10">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-on-surface">Sleep (Hours/Night)</label>
                    <span className="text-primary font-bold text-xl">{formData.sleep_hours_per_night}</span>
                  </div>
                  <input type="range" name="sleep_hours_per_night" value={formData.sleep_hours_per_night} onChange={handleChange} min="0" max="24" step="0.5" className="w-full accent-primary" />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-on-surface">Physical Activity (Hours/Day)</label>
                    <span className="text-primary font-bold text-xl">{formData.physical_activity_hours}</span>
                  </div>
                  <input type="range" name="physical_activity_hours" value={formData.physical_activity_hours} onChange={handleChange} min="0" max="10" step="0.5" className="w-full accent-primary" />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-on-surface">Productivity/Study (Hours/Day)</label>
                    <span className="text-primary font-bold text-xl">{formData.study_hours}</span>
                  </div>
                  <input type="range" name="study_hours" value={formData.study_hours} onChange={handleChange} min="0" max="24" step="0.5" className="w-full accent-primary" />
                </div>
              </div>
              
              <div className="mt-12 flex justify-between items-center">
                <button type="button" onClick={prevStep} className="text-on-surface-variant font-bold flex items-center gap-2 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">arrow_back</span> Back
                </button>
                <button type="button" onClick={nextStep} className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
                  Continue <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Step 4: Current State */}
          <div className={`w-full transition-all duration-500 cubic-bezier-transition ${currentStep === 4 ? 'relative opacity-100 translate-x-0 z-10' : 'absolute top-0 left-0 opacity-0 translate-x-full z-0 pointer-events-none'}`}>
            <div className="glass-card rounded-[32px] p-8 md:p-12 shadow-xl text-center">
              <div className="w-20 h-20 bg-primary-container/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Current Mental State</h2>
              <p className="text-on-surface-variant mb-12">How are you feeling right now, in this moment?</p>
              
              <div className="space-y-12 max-w-md mx-auto">
                <div className="space-y-4 text-left">
                  <label className="font-bold text-on-surface block text-center">Stress Level</label>
                  <select name="stress_level" value={formData.stress_level} onChange={handleChange} className="w-full bg-white/50 border border-outline-variant/30 rounded-full px-6 py-4 text-on-surface focus:outline-none focus:border-primary transition-all appearance-none text-center">
                    <option value="Low">Low Stress (Calm)</option>
                    <option value="Medium">Medium Stress</option>
                    <option value="High">High Stress</option>
                    <option value="Very High">Very High Stress</option>
                  </select>
                </div>
                
                <div className="bg-surface-container-low p-6 rounded-2xl border border-white/50 text-left">
                  <p className="font-body-sm text-on-surface-variant italic">"This data is processed locally using our privacy-first AI. Your results will never be shared without your explicit consent."</p>
                </div>
              </div>

              {error && (
                <div className="mt-6 text-error text-sm font-bold bg-error-container p-4 rounded-xl">
                  {error}
                </div>
              )}
              
              <div className="mt-16 flex flex-col gap-4">
                <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-on-primary py-5 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center gap-3">
                  {isSubmitting ? <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span> : "Analyze My Signal"}
                </button>
                <button type="button" onClick={prevStep} disabled={isSubmitting} className="text-on-surface-variant font-bold hover:text-primary py-2 transition-colors">
                  Go back and edit
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Loading Overlay */}
        <div className={`fixed inset-0 z-[100] bg-on-background/40 backdrop-blur-md transition-all duration-500 flex items-center justify-center ${isSubmitting ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className={`glass-card p-12 rounded-[40px] max-w-sm w-full text-center transition-all duration-500 ${isSubmitting ? 'scale-100' : 'scale-90'}`}>
            <span className="material-symbols-outlined text-6xl text-primary animate-spin mx-auto mb-6">progress_activity</span>
            <h3 className="font-headline-lg text-headline-lg mb-4 text-on-surface">Analyzing...</h3>
            <p className="text-on-surface-variant mb-8">Processing your lifestyle and digital habits against millions of baseline signals.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
