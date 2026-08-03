import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import Link from "next/link";
import { Activity } from "lucide-react";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <Hero />
        <Features />
      </main>
      
      <footer className="glass-dark border-t border-white/5 py-12 relative overflow-hidden">
        {/* Wave divider (CSS generated via gradient/curve or SVG, we'll use simple layout for now) */}
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl text-white">MindSight</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-white/60">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary transition-colors text-primary/80 font-semibold">Emergency Resources</Link>
          </div>
          
          <div className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} MindSight. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
