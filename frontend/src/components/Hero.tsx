"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { BrainVisualization } from "./BrainVisualization";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0F172A,#1e1b4b,#0F172A)] opacity-90" />
        <div 
          className="absolute inset-0 opacity-30 mix-blend-screen"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, #6366F1 0%, transparent 50%), radial-gradient(circle at 80% 20%, #22D3EE 0%, transparent 40%)",
            filter: "blur(80px)",
            animation: "aurora 15s ease infinite"
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-12 items-center pt-24">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark w-fit border border-primary/30"
          >
            <BrainCircuit className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary-foreground">AI-Powered Signal Detection</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white">
            Understand Your Mind Before It <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Cries for Help.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
            AI analyzes behavioral signals and emotional patterns to provide early mental health insights with compassion and privacy.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link href="/assessment">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold text-lg shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] group"
              >
                Start Assessment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            
            <Link href="#features">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full glass-dark text-white font-semibold text-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                Learn More
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* 3D Visualization */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-[500px] md:h-[600px] w-full relative"
        >
          <div className="absolute inset-0 glass-dark rounded-[40px] border border-white/5 overflow-hidden">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#6366F1" />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22D3EE" />
              <BrainVisualization />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
          </div>
          
          {/* Floating Blobs */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 w-32 h-32 bg-primary/30 rounded-full blur-2xl"
          />
          <motion.div 
            animate={{ y: [0, 30, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-2xl"
          />
        </motion.div>

      </div>
    </section>
  );
}
