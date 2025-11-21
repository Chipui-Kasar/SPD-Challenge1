import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    const QuestionPrompt = [
      "who",
      "what",
      "when",
      "where",
      "why",
      "how",
      "is",
      "are",
      "do",
      "does",
      "did",
      "can",
      "could",
      "would",
      "will",
      "shall",
      "may",
      "might",
      "?",
    ];
    const finalPrompt =
      typeof prompt === "string" && prompt.trim() !== ""
        ? QuestionPrompt.some((word) =>
            prompt.toLowerCase().trim().startsWith(word)
          )
          ? `Answer in few lines only: ${prompt}`
          : `Sort these number words in ascending order and return them as words: ${prompt}`
        : "Who is Chipui Kasar?";

    const resp: any = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: finalPrompt,
    });

    // The SDK shape can vary; prefer `text`, fall back to candidates or other fields
    const text = resp?.text ?? resp?.candidates?.[0]?.content ?? null;

    return NextResponse.json({ output: text });
  } catch (err) {
    console.error("/api/gemini error:", err);
    return NextResponse.json(
      { error: "Gemini request failed" },
      { status: 500 }
    );
  }
}
