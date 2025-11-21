"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Generate a random test input from common number-words
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

  const handleCheck = async () => {
    setLoading(true);
    setOutput(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      // Prefer model output, then fallback output, then error text
      if (data.output) setOutput(String(data.output));
      else if (data.fallback && data.message) setOutput(String(data.message));
      else if (data.error) setOutput(`Error: ${data.error}`);
      else setOutput("No response returned");
    } catch (err) {
      setOutput(`Request failed: ${String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-6xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-center sm:text-center w-full">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 w-full">
            Welcome to Challenge 1!
          </h1>
          <p className="w-full text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Ask{" "}
            <a
              href="https://chipuikasar.netlify.app/"
              className="font-medium text-zinc-950 dark:text-zinc-50"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chipui Kasar
            </a>{" "}
          </p>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='"two hundred fifty five", "seventy seven", "one thousand five", "six", "fifty"'
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="w-full text-left mt-4">
            <button
              onClick={handleCheck}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[200px]"
              disabled={loading}
            >
              {loading ? "Checking..." : "Check Result"}
            </button>
            <button
              onClick={() => {
                setInput(generateRandomInput());
                setOutput(null);
              }}
              className="ml-3 inline-flex items-center gap-2 rounded-full bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 md:w-[150px]"
            >
              Insert Random
            </button>
            <button
              onClick={() => {
                setInput(
                  '"two hundred fifty five", "seventy seven", "one thousand five", "six", "fifty"'
                );
                setOutput(null);
              }}
              className="ml-3 inline-flex items-center gap-2 rounded-full border border-solid border-black/[.08] px-5 py-3 hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[120px]"
            >
              Reset
            </button>
          </div>

          <div className="w-full mt-6">
            <h2 className="text-xl font-medium">Result</h2>
            <pre className="whitespace-pre-wrap bg-gray-10 p-4 rounded mt-2">
              {output ?? "No result yet"}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}
