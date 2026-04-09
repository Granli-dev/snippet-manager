import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { deleteSnippet } from "../actions";
import { getLanguageColor } from "@/lib/language-colors";
import { DeleteButton } from "@/components/snippets/DeleteButton";
import type { SnippetWithTags } from "@/types";

export default async function SnippetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: row } = await supabase
    .from("snippets")
    .select("*, snippet_tags(tags(*))")
    .eq("id", id)
    .single();

  if (!row) notFound();

  const snippet: SnippetWithTags = {
    ...row,
    tags: (row.snippet_tags ?? [])
      .map((st: { tags: unknown }) => st.tags)
      .filter(Boolean),
  };

  const deleteWithId = deleteSnippet.bind(null, snippet.id);

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur border-b border-zinc-800 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 min-w-0">
            <Link
              href="/snippets"
              className="shrink-0 text-sm text-zinc-500 hover:text-zinc-200 transition-colors"
            >
              ← Back
            </Link>
            <h1 className="font-semibold text-zinc-100 truncate">{snippet.title}</h1>
          </div>
          <div className="flex items-center gap-4 shrink-0 ml-4">
            <Link
              href={`/snippets/${snippet.id}/edit`}
              className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              Edit
            </Link>
            <DeleteButton action={deleteWithId} />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`text-xs font-mono px-2.5 py-1 rounded border ${getLanguageColor(snippet.language)}`}
          >
            {snippet.language}
          </span>
          {snippet.tags.map((tag) => (
            <span
              key={tag.id}
              className="text-xs bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-md"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        {snippet.description && (
          <p className="text-zinc-400">{snippet.description}</p>
        )}

        {/* Code block — syntax highlighting comes next */}
        <div className="rounded-xl border border-zinc-800 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800">
            <span className="text-xs font-mono text-zinc-500">{snippet.language}</span>
          </div>
          <pre className="bg-zinc-950 p-5 overflow-x-auto text-sm font-mono leading-relaxed text-zinc-300">
            <code>{snippet.code}</code>
          </pre>
        </div>
      </main>
    </div>
  );
}
