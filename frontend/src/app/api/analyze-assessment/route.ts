import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { formData, score } = await req.json();

    const prompt = `
      You are an empathetic and professional AI mental health coach. 
      The user just completed a mental health assessment.
      
      Here is their data:
      - Age: ${formData.age}
      - Gender: ${formData.gender}
      - Most used platform: ${formData.most_used_platform}
      - Daily screen time: ${formData.avg_daily_usage_hours} hours
      - Daily physical activity: ${formData.physical_activity_hours} hours
      - Daily sleep: ${formData.sleep_hours_per_night} hours
      - Self-reported stress level: ${formData.stress_level}
      - Calculated Mental Health Risk Score (out of 10, where higher means higher risk/stress): ${score}

      Based on this data, write a personalized, empathetic 3-4 sentence paragraph that:
      1. Acknowledges their current state without being judgmental.
      2. Points out one specific positive thing (e.g., if they sleep well or exercise) OR gently points out a habit they could improve.
      3. Provides a single, highly actionable tip tailored to their data.
      
      Keep the tone uplifting, supportive, and concise. Do NOT give medical diagnoses.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const insight = response.text;

    return NextResponse.json({ insight });
  } catch (error) {
    console.error("Error generating AI insight:", error);
    return NextResponse.json({ insight: "We're currently unable to generate personalized AI insights at this moment, but please explore the resources below based on your score." }, { status: 500 });
  }
}
