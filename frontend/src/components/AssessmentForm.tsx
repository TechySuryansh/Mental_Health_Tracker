"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight, Activity, Brain } from "lucide-react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<AssessmentData>({
    age: 20,
    gender: "Male",
    country: "USA",
    academic_level: "Undergraduate",
    most_used_platform: "Instagram",
    purpose_of_use: "Entertainment",
    avg_daily_usage_hours: 4.0,
    daily_unlocks: 30,
    study_hours: 3.0,
    physical_activity_hours: 1.0,
    sleep_hours_per_night: 7.0,
    stress_level: "Medium",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // Parse numbers for specific fields
    const numberFields = [
      "age",
      "avg_daily_usage_hours",
      "daily_unlocks",
      "study_hours",
      "physical_activity_hours",
      "sleep_hours_per_night",
    ];

    setFormData((prev) => ({
      ...prev,
      [name]: numberFields.includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction from backend.");
      }

      const data = await response.json();
      setResult(data.predicted_mental_health_score);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the prediction server. Is the backend running?");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (result !== null) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-dark p-8 md:p-12 rounded-3xl max-w-2xl w-full mx-auto text-center relative overflow-hidden"
      >
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-accent/20 rounded-full blur-[100px]" />
        
        <Brain className="w-20 h-20 text-primary mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-white mb-2">Analysis Complete</h2>
        <p className="text-white/70 mb-8">
          Based on your digital habits and lifestyle metrics, our AI has generated your personalized mental health baseline score.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 inline-block min-w-[250px]">
          <p className="text-sm font-medium text-primary mb-2 uppercase tracking-wider">
            Predicted Score
          </p>
          <div className="text-6xl font-bold text-white flex items-baseline justify-center gap-2">
            {result}
            <span className="text-xl text-white/50 font-normal">/ 10</span>
          </div>
        </div>

        <div>
          <button
            onClick={() => setResult(null)}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-colors"
          >
            Retake Assessment
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-dark p-6 md:p-10 rounded-3xl max-w-4xl w-full mx-auto relative z-10"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Activity className="text-primary" /> Mental Health Assessment
        </h2>
        <p className="text-white/60 mt-2">
          Fill out the form below to receive a personalized, AI-driven mental health score based on your lifestyle and platform usage.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Demographics */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min={10}
              max={100}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all [&>option]:bg-slate-900"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Academic Level</label>
            <select
              name="academic_level"
              value={formData.academic_level}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all [&>option]:bg-slate-900"
            >
              <option value="High School">High School</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Graduate">Graduate</option>
            </select>
          </div>

          {/* Social Media */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Most Used Platform</label>
            <select
              name="most_used_platform"
              value={formData.most_used_platform}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all [&>option]:bg-slate-900"
            >
              <option value="Facebook">Facebook</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Instagram">Instagram</option>
              <option value="Snapchat">Snapchat</option>
              <option value="Twitter">Twitter</option>
              <option value="YouTube">YouTube</option>
              <option value="TikTok">TikTok</option>
              <option value="LINE">LINE</option>
              <option value="KakaoTalk">KakaoTalk</option>
              <option value="VKontakte">VKontakte</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="WeChat">WeChat</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Purpose of Use</label>
            <select
              name="purpose_of_use"
              value={formData.purpose_of_use}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all [&>option]:bg-slate-900"
            >
              <option value="Networking">Networking</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
              <option value="News">News</option>
            </select>
          </div>

          {/* Usage Stats */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Avg Daily Usage (Hours)</label>
            <input
              type="number"
              name="avg_daily_usage_hours"
              value={formData.avg_daily_usage_hours}
              onChange={handleChange}
              step="0.1"
              min={0}
              max={24}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Daily Unlocks</label>
            <input
              type="number"
              name="daily_unlocks"
              value={formData.daily_unlocks}
              onChange={handleChange}
              min={0}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              required
            />
          </div>

          {/* Lifestyle */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Study Hours / Day</label>
            <input
              type="number"
              name="study_hours"
              value={formData.study_hours}
              onChange={handleChange}
              step="0.1"
              min={0}
              max={24}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Physical Activity / Day</label>
            <input
              type="number"
              name="physical_activity_hours"
              value={formData.physical_activity_hours}
              onChange={handleChange}
              step="0.1"
              min={0}
              max={24}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Sleep Hours / Night</label>
            <input
              type="number"
              name="sleep_hours_per_night"
              value={formData.sleep_hours_per_night}
              onChange={handleChange}
              step="0.1"
              min={0}
              max={24}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Self-Reported Stress Level</label>
            <select
              name="stress_level"
              value={formData.stress_level}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all [&>option]:bg-slate-900"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Very High">Very High</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive-foreground px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] disabled:opacity-50 disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Analyzing...
              </>
            ) : (
              <>
                Generate Analysis <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
