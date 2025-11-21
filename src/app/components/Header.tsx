"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname() || "/";

  const nav = [
    { href: "/", label: "Home" },
    { href: "/chipuiagent", label: "Chipui Agent" },
  ];

  return (
    <header className="w-full border-b bg-white/50 dark:bg-black/50">
      <div className="mx-auto max-w-3xl px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {nav.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  (isActive
                    ? "bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400  transition-all"
                    : "font-medium text-zinc-700 dark:text-zinc-50 hover:text-zinc-900 dark:hover:text-zinc-50") +
                  ""
                }
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
