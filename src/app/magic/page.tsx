import Link from "next/link";

export default function MagicPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-600 to-indigo-700 text-white">
      <main className="max-w-3xl p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Magic Page ✨</h1>
        <p className="mb-6 text-lg">
          Welcome to the magic page — here's something special. You can add
          interactive components here or replace this placeholder with your own
          content.
        </p>
        <div className="mb-6">
          <div className="inline-block rounded-md bg-white/10 px-4 py-2">
            A small magical card
          </div>
        </div>
        <Link
          href="/"
          className="inline-block rounded bg-white text-black px-4 py-2 font-medium"
        >
          Back Home
        </Link>
      </main>
    </div>
  );
}
