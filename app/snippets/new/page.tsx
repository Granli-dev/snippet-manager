import Link from "next/link";
import { SnippetForm } from "@/components/snippets/SnippetForm";
import { createSnippet } from "../actions";

export default function NewSnippetPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur border-b border-zinc-800 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link
            href="/snippets"
            className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors"
          >
            ← Back
          </Link>
          <h1 className="font-semibold text-zinc-100">New Snippet</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        <SnippetForm action={createSnippet} />
      </main>
    </div>
  );
}
