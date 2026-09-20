import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

function getGenAI() {
  return new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

const SYSTEM_INSTRUCTION = `You are a helpful, enthusiastic, and expert AI assistant for VOLTRIX RC Motors (Malaysia), specializing in high-performance RC brushless motors.
Brand Details:
- Name: VOLTRIX (Combination of "volt" and "trix", representing electric power and high technology).
- Tagline: "Power You Can Feel."
- Main Signature Color: Electric Yellow Anodized 6061-T6 Aluminum.
- Product Lineup & Tiers:
  1. Voltrix Spark (Entry level) - 3300KV, Kod winding: 3650-18T, RM119. Focus: Smooth linear torque control, high thermal efficiency, and forgiving throttle for beginners and club practice.
  2. Voltrix Storm (Flagship / Comp) - 8330KV, Kod winding: 3650-7T, RM189. Focus: Ultra-high RPM burst acceleration and explosive straightaway top speed for national circuit podiums.
  3. Voltrix Apex (Pro Competition) - 4500KV, Kod winding: 3650-13T, RM129. Focus: Surgical throttle precision, balanced mid-range punch, anti-cogging stator for competitive touring & drift chassis.
  4. Voltrix Black Edition (Limited / Extreme) - 5200KV, Kod winding: 3650-11T, RM159. Focus: Extreme top-end velocity, Kevlar-wrapped 65,000 RPM rotor, hybrid ceramic bearings, stealth matte black finish.
- Pricing & Orders:
  Spark (RM119), Storm (RM189), Apex (RM129), Black Edition (RM159). Free shipping within Peninsular Malaysia.
  Official order link: https://wa.me/60133008217 (WhatsApp).
Answer customer inquiries in both Bahasa Melayu and English naturally. Keep responses concise, helpful, and technically accurate.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const contents = messages
      .filter((msg: any) => msg && (msg.text || msg.content))
      .map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : (msg.role || 'user'),
        parts: [{ text: String(msg.text || msg.content || '') }]
      }));

    const ai = getGenAI();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("Chat API error:", error);
    // If quota or API limit is reached, provide a helpful automated Voltrix sales assistant fallback
    const fallbackText = 
      "Terima kasih kerana menghubungi VOLTRIX RC Malaysia!\n\n" +
      "Berikut adalah 4 siri motor brushless kami:\n" +
      "1. Voltrix Spark (Entry): 3300KV, Kod 3650-18T - RM 119\n" +
      "2. Voltrix Storm (Flagship/Comp): 8330KV, Kod 3650-7T - RM 189\n" +
      "3. Voltrix Apex (Pro Comp): 4500KV, Kod 3650-13T - RM 129\n" +
      "4. Voltrix Black Edition (Extreme): 5200KV, Kod 3650-11T - RM 159\n\n" +
      "Untuk membuat tempahan atau pertanyaan lanjut, hubungi kami di WhatsApp: https://wa.me/60133008217";

    return NextResponse.json({ text: fallbackText });
  }
}
