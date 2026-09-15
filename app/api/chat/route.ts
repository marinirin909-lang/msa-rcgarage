import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const SYSTEM_INSTRUCTION = `You are a helpful and expert AI assistant for MSA RcGarage, specializing in the MSA 2940-7T Competition-Grade Brushless Motor. 
Your goal is to answer guest questions accurately about the product's specifications, installation, usage, and features.
You have access to Google Search to look up up-to-date information if needed.
Keep your answers concise, professional, and friendly.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body; // Array of { role: 'user' | 'model', text: string }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    // Format for @google/genai contents
    const contents = messages.map((msg: any) => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }]
      }
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
