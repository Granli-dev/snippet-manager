import Link from "next/link";
import type { SnippetWithTags } from "@/types";
import { getLanguageColor } from "@/lib/language-colors";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function SnippetCard({ snippet }: { snippet: SnippetWithTags }) {
  return (
    <Link
      href={`/snippets/${snippet.id}`}
      className="group flex flex-col gap-3 border border-zinc-800 rounded-xl p-5 bg-zinc-900 hover:border-zinc-600 hover:bg-zinc-800/60 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-semibold text-zinc-100 truncate group-hover:text-white transition-colors">
          {snippet.title}
        </h2>
        <span className={`shrink-0 text-xs font-mono px-2 py-0.5 rounded border ${getLanguageColor(snippet.language)}`}>
          {snippet.language}
        </span>
      </div>

      {snippet.description && (
        <p className="text-sm text-zinc-400 line-clamp-2">{snippet.description}</p>
      )}

      {/* Code preview */}
      <pre className="text-xs font-mono text-zinc-500 bg-zinc-950 rounded-lg p-3 line-clamp-3 overflow-hidden leading-relaxed">
        {snippet.code}
      </pre>

      <div className="flex items-center justify-between gap-2 mt-auto pt-1">
        <div className="flex flex-wrap gap-1">
          {snippet.tags.map((tag) => (
            <span
              key={tag.id}
              className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-md"
            >
              #{tag.name}
            </span>
          ))}
        </div>
        <span className="text-xs text-zinc-600 shrink-0">{timeAgo(snippet.created_at)}</span>
      </div>
    </Link>
  );
}
