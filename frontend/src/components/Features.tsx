"use client";

import { motion, Variants } from "framer-motion";
import { 
  Activity, 
  Brain, 
  HeartPulse, 
  LineChart, 
  ShieldCheck, 
  Sparkles 
} from "lucide-react";

const features = [
  {
    title: "Emotion Detection",
    description: "Advanced AI algorithms detect subtle changes in emotional patterns through behavioral signals.",
    icon: HeartPulse,
    color: "text-rose-400",
    bg: "bg-rose-400/10",
  },
  {
    title: "Stress Prediction",
    description: "Identify potential stress triggers before they escalate into overwhelming anxiety.",
    icon: Activity,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    title: "Personalized Insights",
    description: "Receive tailored mental wellness recommendations based on your unique profile.",
    icon: Brain,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Interactive Charts",
    description: "Visualize your emotional journey with premium, easy-to-understand interactive graphs.",
    icon: LineChart,
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    title: "AI Recommendations",
    description: "Get compassionate, evidence-based coping strategies from our intelligent assistant.",
    icon: Sparkles,
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    title: "Privacy First",
    description: "Your mental health data is encrypted and strictly confidential. We never share your data.",
    icon: ShieldCheck,
    color: "text-success",
    bg: "bg-success/10",
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export function Features() {
  return (
    <section id="features" className="py-32 relative bg-background overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Intelligent Signals, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Proactive Care.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/60"
          >
            Our platform combines state-of-the-art machine learning with clinical psychology principles to help you understand your mind better.
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative glass-dark rounded-3xl p-8 border border-white/5 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 relative z-10`}>
                  <Icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3 relative z-10">
                  {feature.title}
                </h3>
                
                <p className="text-white/60 leading-relaxed relative z-10">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
