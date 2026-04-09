import type { Database } from "./database";

// Raw row types extracted from the Database type
export type Snippet = Database["public"]["Tables"]["snippets"]["Row"];
export type Tag = Database["public"]["Tables"]["tags"]["Row"];
export type SnippetTag = Database["public"]["Tables"]["snippet_tags"]["Row"];

// Insert/Update shapes (used in forms and API calls)
export type SnippetInsert = Database["public"]["Tables"]["snippets"]["Insert"];
export type SnippetUpdate = Database["public"]["Tables"]["snippets"]["Update"];
export type TagInsert = Database["public"]["Tables"]["tags"]["Insert"];

// Composed app-level type: a snippet with its tags already joined
export type SnippetWithTags = Snippet & {
  tags: Tag[];
};

// The set of languages we support (used in dropdowns and syntax highlighting)
export const SUPPORTED_LANGUAGES = [
  "typescript",
  "javascript",
  "python",
  "rust",
  "go",
  "sql",
  "bash",
  "json",
  "html",
  "css",
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
