import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/(auth)/actions";
import { SnippetCard } from "@/components/snippets/SnippetCard";
import type { SnippetWithTags } from "@/types";

export default async function SnippetsPage() {
  const supabase = await createClient();

  const { data: rows } = await supabase
    .from("snippets")
    .select("*, snippet_tags(tags(*))")
    .order("created_at", { ascending: false });

  const snippets: SnippetWithTags[] = (rows ?? []).map((row) => ({
    ...row,
    tags: (row.snippet_tags ?? [])
      .map((st: { tags: unknown }) => st.tags)
      .filter(Boolean),
  }));

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur border-b border-zinc-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">⌗</span>
            <span className="font-bold text-zinc-100 tracking-tight">Snippets</span>
            {snippets.length > 0 && (
              <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full ml-1">
                {snippets.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/snippets/new"
              className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <span>+</span> New snippet
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {snippets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="text-5xl">✦</div>
            <p className="text-zinc-400 text-lg">No snippets yet</p>
            <Link
              href="/snippets/new"
              className="text-sm text-violet-400 hover:text-violet-300 underline underline-offset-4 transition-colors"
            >
              Create your first snippet
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {snippets.map((snippet) => (
              <SnippetCard key={snippet.id} snippet={snippet} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
