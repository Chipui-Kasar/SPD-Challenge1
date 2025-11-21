import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { input } = await request.json();

    if (!input) {
      return NextResponse.json({ error: "No input provided" }, { status: 400 });
    }

    const localSorted = localSortWordsInput(input);
    return NextResponse.json({
      output: localSorted,
      fallback: true,
      message: "Local sorting used",
    });
  } catch (error) {
    console.error("/api/chat local error:", error);
    return NextResponse.json(
      { error: "Local sorting failed" },
      { status: 500 }
    );
  }
}

function normalizeWord(s: string) {
  return s
    .toLowerCase()
    .replace(/[-,]/g, " ")
    .replace(/\band\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordsToNumber(s: string) {
  const units: Record<string, number> = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    fifteen: 15,
    sixteen: 16,
    seventeen: 17,
    eighteen: 18,
    nineteen: 19,
  };
  const tens: Record<string, number> = {
    twenty: 20,
    thirty: 30,
    forty: 40,
    fifty: 50,
    sixty: 60,
    seventy: 70,
    eighty: 80,
    ninety: 90,
  };
  const scales: Record<string, number> = {
    hundred: 100,
    thousand: 1000,
    million: 1000000,
  };

  let total = 0;
  let current = 0;
  const tokens = normalizeWord(s).split(" ");
  for (const token of tokens) {
    if (units[token] !== undefined) {
      current += units[token];
    } else if (tens[token] !== undefined) {
      current += tens[token];
    } else if (token === "hundred") {
      current = current * scales[token];
    } else if (scales[token]) {
      current = current * scales[token];
      total += current;
      current = 0;
    } else {
      // unknown token, ignore
    }
  }
  return total + current;
}

function parseInputList(input: any): string[] {
  if (Array.isArray(input)) return input.map(String);
  if (typeof input !== "string") return [String(input)];

  // Split on commas, but allow quoted strings
  const parts = input.split(",").map((p) => p.trim());
  return parts.map((p) => p.replace(/^"|"$/g, "").trim());
}

function localSortWordsInput(input: any) {
  const items = parseInputList(input);
  const mapped = items.map((orig) => ({ value: orig, n: wordsToNumber(orig) }));
  mapped.sort((a, b) => a.n - b.n);
  return mapped.map((m) => m.value).join(", ");
}
