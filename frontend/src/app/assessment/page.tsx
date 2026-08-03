"use client";
import { AssessmentForm } from "@/components/AssessmentForm";
import Link from "next/link";
import { ShaderBackground } from "@/components/ShaderBackground";

export default function AssessmentPage() {
  return (
    <>
      <ShaderBackground />
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 bg-surface/20 dark:bg-surface/20 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="flex justify-between items-center px-margin-mobile md:px-gutter py-4 w-full max-w-container-max mx-auto">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            <span className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary hidden md:inline-block">Mental Health Signal</span>
          </div>
          <Link href="/" className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-caps text-label-caps hover:bg-primary-container transition-colors active:scale-95 duration-200">
            Cancel
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        <AssessmentForm />
      </main>

      {/* Bottom Navigation Shell (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface/20 dark:bg-surface/20 backdrop-blur-xl border-t border-white/20 shadow-[0_-10px_20px_rgba(99,102,241,0.05)] flex justify-around items-center py-3 px-2 rounded-t-xl">
        <div className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1">
          <span className="material-symbols-outlined">analytics</span>
          <span className="font-label-caps text-label-caps">Assess</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all">
          <span className="material-symbols-outlined">history</span>
          <span className="font-label-caps text-label-caps">History</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all">
          <span className="material-symbols-outlined">smart_toy</span>
          <span className="font-label-caps text-label-caps">AI Coach</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-caps text-label-caps">Profile</span>
        </div>
      </nav>
    </>
  );
}
