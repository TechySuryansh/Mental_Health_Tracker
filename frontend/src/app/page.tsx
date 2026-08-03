"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ShaderBackground } from "@/components/ShaderBackground";

export default function LandingPage() {
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((el) => {
      if (el) {
        el.classList.add(
          "transition-all",
          "duration-700",
          "cubic-bezier-transition",
          "opacity-0",
          "translate-y-10"
        );
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const setRef = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <>
      <ShaderBackground />
      
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/20 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="flex justify-between items-center px-margin-mobile md:px-gutter py-4 w-full max-w-container-max mx-auto">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-bold text-primary">Mental Health Signal</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-primary font-bold font-label-caps text-label-caps transition-colors hover:opacity-80">Home</Link>
            <Link href="/assessment" className="text-on-surface-variant font-label-caps text-label-caps transition-colors hover:text-primary">Assess</Link>
            <Link href="#" className="text-on-surface-variant font-label-caps text-label-caps transition-colors hover:text-primary">Journal</Link>
            <Link href="#" className="text-on-surface-variant font-label-caps text-label-caps transition-colors hover:text-primary">Community</Link>
          </nav>
          <Link href="/assessment" className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-label-caps text-label-caps font-bold transition-all hover:scale-105 active:scale-95 glow-primary inline-block">
            Start
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section ref={setRef} className="min-h-screen flex flex-col items-center justify-center pt-24 px-margin-mobile">
          <div className="max-w-4xl w-full text-center space-y-8 glass-card p-12 md:p-20 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/10 rounded-full blur-[100px]"></div>
            
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <span className="inline-block py-1 px-4 bg-primary-fixed text-on-primary-fixed-variant rounded-full font-label-caps text-label-caps uppercase tracking-widest mb-4">
                AI-Powered Intelligence
              </span>
              <h2 className="font-display text-display text-on-surface leading-tight">
                Understand Your <span className="text-primary">Mental Wellness</span> Through AI
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
                Detect early signals and reclaim your calm. Our proprietary signals analysis provides deeper insight into your cognitive and emotional baseline.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-6">
              <Link href="/assessment" className="w-full md:w-auto h-14 px-10 bg-primary text-on-primary rounded-full font-headline-lg-mobile text-headline-lg-mobile font-bold glow-primary transition-all hover:brightness-110 active:scale-95 flex items-center justify-center gap-3">
                Start Assessment
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <button className="w-full md:w-auto h-14 px-10 glass-card text-primary rounded-full font-headline-lg-mobile text-headline-lg-mobile font-bold transition-all hover:bg-white/30 active:scale-95">
                View Demo
              </button>
            </div>
            
            {/* Trusted Badge */}
            <div className="pt-12 flex flex-col items-center gap-4">
              <p className="font-label-caps text-label-caps text-on-surface-variant opacity-60 uppercase tracking-widest">Trusted by 50,000+ Wellness Seekers</p>
              <div className="flex gap-8 grayscale opacity-40">
                <div className="h-6 w-24 bg-on-surface-variant/30 rounded"></div>
                <div className="h-6 w-24 bg-on-surface-variant/30 rounded"></div>
                <div className="h-6 w-24 bg-on-surface-variant/30 rounded"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid Section */}
        <section ref={setRef} className="py-section-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h3 className="font-headline-lg text-headline-lg text-on-surface">Designed for Emotional Precision</h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
              Merging clinical science with cutting-edge artificial intelligence to create a safer space for your mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-card p-8 rounded-3xl hover:translate-y-[-8px] transition-transform duration-500 cubic-bezier-transition group">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">psychology</span>
              </div>
              <h4 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-3">AI Prediction</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Our neural engines analyze subtle vocal and facial patterns to predict stress signals before they manifest.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-3xl hover:translate-y-[-8px] transition-transform duration-500 cubic-bezier-transition group">
              <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">verified_user</span>
              </div>
              <h4 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-3">Privacy First</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Your emotional data is your own. End-to-end encryption ensures that your assessments never leave your device.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-3xl hover:translate-y-[-8px] transition-transform duration-500 cubic-bezier-transition group">
              <div className="w-14 h-14 bg-tertiary-container/10 rounded-2xl flex items-center justify-center text-tertiary-container mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">bolt</span>
              </div>
              <h4 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-3">Personalized Insights</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Receive a customized roadmap of mindfulness exercises tailored to your unique psychological signature.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-3xl hover:translate-y-[-8px] transition-transform duration-500 cubic-bezier-transition group">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">query_stats</span>
              </div>
              <h4 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-3">Fast Assessment</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Get a complete mental health snapshot in under 3 minutes. Efficient, scientific, and remarkably accurate.
              </p>
            </div>
          </div>
        </section>

        {/* Asymmetric Bento-style Detail Section */}
        <section ref={setRef} className="py-section-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 rounded-[2rem] overflow-hidden relative min-h-[400px] shadow-xl group">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDab4TcIGOQkeBe9tOTA5v_87SovCx2CLHsg1HYIesBN7-vVt6GNpCSPr4iiMSHFg1LuvH6HcaqjTUCN8m9CnXhUe6n6xU2Lp-k3M7ZadDYt8RJaplE7p38VTxQAIGzLGMjtjFtn7BR-vgnuUXDw6HgdSAwo1lw5-xIe7PJLajYBrwp9_tTiVLYf2-VbrK5LCtZgJfc_p-A4t7l95t2br_9BpDMOfmkLOOu21wCgynYeHG8Bcd4QZdzeg')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-on-surface">
                <h4 className="font-headline-lg text-headline-lg mb-2">Safe Intelligence</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">AI that listens to what you don't say.</p>
              </div>
            </div>
            
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="glass-card p-10 rounded-[2rem] flex-1">
                <h5 className="font-headline-lg-mobile text-headline-lg-mobile mb-4">Daily Tracking</h5>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden mb-6">
                  <div className="h-full bg-primary w-3/4 rounded-full"></div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Track your progression over weeks and months to see real behavioral change and growth.</p>
              </div>
              
              <div className="bg-primary p-10 rounded-[2rem] flex-1 text-on-primary shadow-2xl glow-primary">
                <span className="material-symbols-outlined text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <h5 className="font-headline-lg-mobile text-headline-lg-mobile mb-4">Signal Detection</h5>
                <p className="font-body-sm text-body-sm text-primary-fixed opacity-90">Our algorithm detects micro-fluctuations in heart rate and vocal tone via smartphone sensors.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section ref={setRef} className="py-section-gap px-margin-mobile text-center">
          <div className="max-w-3xl mx-auto glass-card py-20 px-8 md:px-16 rounded-[3rem] border-primary/20">
            <h2 className="font-headline-lg text-headline-lg mb-6">Ready to find your baseline?</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-10">Join thousands of users who have prioritized their mental signal. It takes less than 3 minutes.</p>
            <Link href="/assessment" className="inline-block bg-primary text-on-primary px-12 py-5 rounded-full font-headline-lg-mobile text-headline-lg-mobile font-bold glow-primary transition-all hover:scale-105 active:scale-95">
              Start Your Free Assessment
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-section-gap bg-surface-container-lowest text-center px-margin-mobile border-t border-white/20">
        <div className="max-w-container-max mx-auto flex flex-col items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            <span className="font-label-caps text-label-caps font-bold text-on-surface uppercase tracking-widest">Mental Health Signal</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-8">
            <Link href="#" className="text-on-surface-variant font-body-sm text-body-sm hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-on-surface-variant font-body-sm text-body-sm hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="text-on-surface-variant font-body-sm text-body-sm hover:text-primary transition-colors">Support</Link>
            <Link href="#" className="text-on-surface-variant font-body-sm text-body-sm hover:text-primary transition-colors">Clinical Research</Link>
          </nav>
          <p className="font-body-sm text-body-sm text-on-surface-variant opacity-60">
            © 2024 Mental Health Signal. Privacy First. Built for the human mind.
          </p>
        </div>
      </footer>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface/20 backdrop-blur-xl border-t border-white/20 flex justify-around items-center py-3 px-2 rounded-t-xl shadow-[0_-10px_20px_rgba(99,102,241,0.05)]">
        <Link href="/assessment" className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1">
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
          <span className="font-label-caps text-label-caps">Assess</span>
        </Link>
        <Link href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all">
          <span className="material-symbols-outlined text-2xl">history</span>
          <span className="font-label-caps text-label-caps">History</span>
        </Link>
        <Link href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all">
          <span className="material-symbols-outlined text-2xl">smart_toy</span>
          <span className="font-label-caps text-label-caps">AI Coach</span>
        </Link>
        <Link href="#" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all">
          <span className="material-symbols-outlined text-2xl">person</span>
          <span className="font-label-caps text-label-caps">Profile</span>
        </Link>
      </nav>
    </>
  );
}
