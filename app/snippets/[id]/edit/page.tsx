import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SnippetForm } from "@/components/snippets/SnippetForm";
import { updateSnippet } from "../../actions";
import type { SnippetWithTags } from "@/types";

export default async function EditSnippetPage({
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

  const updateWithId = updateSnippet.bind(null, snippet.id);

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur border-b border-zinc-800 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link
            href={`/snippets/${snippet.id}`}
            className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors"
          >
            ← Back
          </Link>
          <h1 className="font-semibold text-zinc-100">Edit Snippet</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        <SnippetForm action={updateWithId} defaultValues={snippet} />
      </main>
    </div>
  );
}
