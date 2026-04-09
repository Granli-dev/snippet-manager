// Accent color per language — used for badges throughout the app
export const LANGUAGE_COLORS: Record<string, string> = {
  typescript:  "bg-blue-950 text-blue-300 border-blue-800",
  javascript:  "bg-yellow-950 text-yellow-300 border-yellow-800",
  python:      "bg-green-950 text-green-300 border-green-800",
  rust:        "bg-orange-950 text-orange-300 border-orange-800",
  go:          "bg-cyan-950 text-cyan-300 border-cyan-800",
  sql:         "bg-violet-950 text-violet-300 border-violet-800",
  bash:        "bg-zinc-800 text-zinc-300 border-zinc-700",
  json:        "bg-zinc-800 text-zinc-300 border-zinc-700",
  html:        "bg-red-950 text-red-300 border-red-800",
  css:         "bg-pink-950 text-pink-300 border-pink-800",
};

export function getLanguageColor(language: string): string {
  return LANGUAGE_COLORS[language] ?? "bg-zinc-800 text-zinc-300 border-zinc-700";
}
