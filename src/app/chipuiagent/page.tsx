"use client";
import { useState } from "react";
import Link from "next/link";

export default function GeminiPage() {
  const [prompt, setPrompt] = useState<string>("");
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateRandomInput = () => {
    const samples = [
      '"two hundred fifty five"',
      '"seventy seven"',
      '"one thousand five"',
      '"six"',
      '"fifty"',
      '"three hundred"',
      '"twelve"',
      '"nine hundred ninety nine"',
      '"forty two"',
      '"one million"',
    ];
    const count = Math.floor(Math.random() * 4) + 3; // 3..6 items
    const picked: string[] = [];
    while (picked.length < count) {
      const s = samples[Math.floor(Math.random() * samples.length)];
      if (!picked.includes(s)) picked.push(s);
    }
    return picked.join(", ");
  };

  const askGemini = async () => {
    setLoading(true);
    setOutput(null);
    try {
      const res = await fetch("/api/chipuiagent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.output) setOutput(String(data.output));
      else setOutput(data.error ?? "No response");
    } catch (err) {
      setOutput(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-24 px-6 bg-white dark:bg-black sm:items-start">
        <div className="w-full">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">
              Check with custom made AI by Chipui
            </h1>
            <Link href="/" className="text-sm text-blue-600">
              Back Home
            </Link>
          </div>

          <textarea
            value={prompt}
            placeholder='"two hundred fifty five", "seventy seven", "one thousand five", "six", "fifty"'
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full min-h-[120px] border rounded p-3 mb-4"
          />

          <div className="flex gap-3 mb-4">
            <button
              onClick={askGemini}
              disabled={loading}
              className="rounded bg-foreground px-4 py-2 text-background"
            >
              {loading ? "Thinking..." : "Ask Chipui's Agent"}
            </button>
            <button
              onClick={() => {
                setPrompt(generateRandomInput());
                setOutput(null);
              }}
              className="rounded bg-blue-600 text-white px-4 py-2"
            >
              Insert Random
            </button>
            <button
              onClick={() => {
                setPrompt("Who is Chipui Kasar?");
                setOutput(null);
              }}
              className="rounded border px-4 py-2"
            >
              Reset
            </button>
          </div>

          <div>
            <h2 className="text-lg font-medium">Response</h2>
            <pre className="whitespace-pre-wrap bg-gray-10 p-3 rounded mt-2">
              {output ?? "No response yet"}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}
