"use client";
import Link from "next/link";

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

export function ResultsDashboard({ score, data, onReset }: { score: number; data: AssessmentData; onReset: () => void }) {
  // Determine score color based on value (Assuming lower is better stress/mental health issues, but here we'll just style it)
  // Let's assume out of 10.
  let scoreColor = "text-primary";
  if (score > 7) scoreColor = "text-error";
  else if (score < 4) scoreColor = "text-secondary";

  return (
    <div className="w-full max-w-6xl mx-auto px-margin-mobile md:px-gutter pt-8 pb-32 animate-in fade-in zoom-in-95 duration-700">
      <div className="flex justify-between items-center mb-12">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-on-surface">Your Mental Signal</h1>
        <div className="flex gap-4">
          <button onClick={onReset} className="px-6 py-2 rounded-full border border-outline-variant/50 text-on-surface-variant font-label-caps hover:bg-surface-variant transition-colors">
            Retake Assessment
          </button>
          <Link href="/" className="px-6 py-2 rounded-full bg-surface-container-highest text-on-surface font-label-caps hover:bg-outline-variant/50 transition-colors">
            Exit
          </Link>
        </div>
      </div>

      {/* Top Banner (Score & AI Summary) */}
      <section className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="glass-card rounded-[2rem] p-8 lg:p-12 flex-1 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-primary to-error opacity-50"></div>
          
          <div className="relative w-48 h-48 rounded-full border-[8px] border-surface-container-highest flex items-center justify-center mb-6">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="none" className="text-surface-container-high" />
              <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="none" 
                className={`${scoreColor} transition-all duration-1500`}
                strokeDasharray="552.92" 
                strokeDashoffset={552.92 - (552.92 * (score / 10))}
                strokeLinecap="round" />
            </svg>
            <div className="text-center">
              <span className={`font-display text-5xl md:text-7xl font-bold ${scoreColor}`}>{score}</span>
              <span className="block text-on-surface-variant font-label-caps mt-2 uppercase tracking-widest">/ 10</span>
            </div>
          </div>
          <h2 className="mt-8 font-headline-lg text-headline-lg text-on-background text-center">Mental Health Score</h2>
        </div>
        
        <div className="flex-1 flex flex-col gap-8">
          <div className="glass-card rounded-[2rem] p-8 flex flex-col gap-6 flex-1">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary-fixed-dim p-2 rounded-lg bg-secondary-container/20">smart_toy</span>
              <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">AI Insights</h3>
            </div>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              Based on your {data.avg_daily_usage_hours} hours of daily screen time primarily on {data.most_used_platform}, combined with your {data.stress_level} stress levels, our models detect a {score > 6 ? "higher" : "moderate"} cognitive load. Consider increasing your {data.physical_activity_hours}h of daily physical activity to improve sleep quality.
            </p>
            <div className="mt-auto pt-4">
              <button className="flex items-center gap-2 text-primary font-label-caps hover:underline">
                Explore Full Analysis <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
          
          <div className="flex gap-6 h-32">
            <button className="flex-1 glass-card rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-white/50 transition-all group border-primary/20 text-on-surface">
              <span className="material-symbols-outlined text-2xl text-primary group-hover:scale-110 transition-transform">picture_as_pdf</span>
              <span className="font-label-caps text-[10px] md:text-xs text-center">Detailed Report</span>
            </button>
            <button className="flex-1 bg-primary-container text-on-primary-container rounded-xl flex flex-col items-center justify-center gap-2 hover:opacity-90 transition-all group">
              <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">support_agent</span>
              <span className="font-label-caps text-[10px] md:text-xs text-center">Connect Coach</span>
            </button>
          </div>
        </div>
      </section>

      {/* Lifestyle Breakdown Section */}
      <section className="mt-12">
        <h3 className="font-headline-lg-mobile text-headline-lg-mobile mb-6 text-on-surface">Lifestyle Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-card rounded-[2rem] p-6 text-on-surface">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-label-caps text-on-surface-variant">Sleep Quality</p>
                <p className="font-headline-lg-mobile">{data.sleep_hours_per_night}h</p>
              </div>
              <span className="material-symbols-outlined text-primary-fixed-dim">bedtime</span>
            </div>
            <div className="h-16 w-full flex items-end gap-1 mt-6">
              {[60, 45, 80, 65, 90, 50, 70].map((h, i) => (
                <div key={i} className={`w-full rounded-t-sm transition-all ${i === 4 ? 'bg-primary/80' : 'bg-primary/20'}`} style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-[2rem] p-6 text-on-surface">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-label-caps text-on-surface-variant">Daily Activity</p>
                <p className="font-headline-lg-mobile">{data.physical_activity_hours}h</p>
              </div>
              <span className="material-symbols-outlined text-secondary-fixed-dim">directions_walk</span>
            </div>
            <div className="h-16 w-full flex items-end gap-1 mt-6">
              {[30, 55, 40, 75, 60, 85, 45].map((h, i) => (
                <div key={i} className={`w-full rounded-t-sm transition-all ${i === 3 ? 'bg-secondary/80' : 'bg-secondary/20'}`} style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-[2rem] p-6 text-on-surface">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-label-caps text-on-surface-variant">Stress Level</p>
                <p className="font-headline-lg-mobile">{data.stress_level}</p>
              </div>
              <span className="material-symbols-outlined text-tertiary-fixed-dim">spa</span>
            </div>
            <div className="h-16 w-full flex items-end gap-1 mt-6">
              {[80, 65, 40, 55, 30, 20, 25].map((h, i) => (
                <div key={i} className={`w-full rounded-t-sm transition-all ${i === 2 ? 'bg-tertiary/80' : 'bg-tertiary/20'}`} style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
