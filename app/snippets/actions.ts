"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type SupabaseClient = Awaited<ReturnType<typeof createClient>>;

export async function createSnippet(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const tagNames = JSON.parse(
    (formData.get("tags") as string) || "[]"
  ) as string[];

  const { data: snippet, error } = await supabase
    .from("snippets")
    .insert({
      user_id: user.id,
      title: formData.get("title") as string,
      description: (formData.get("description") as string) || null,
      code: formData.get("code") as string,
      language: formData.get("language") as string,
    })
    .select()
    .single();

  if (error || !snippet) throw new Error(error?.message ?? "Failed to create snippet");

  await syncTags(supabase, snippet.id, user.id, tagNames);

  revalidatePath("/snippets");
  redirect(`/snippets/${snippet.id}`);
}

// .bind(null, id) is used in the edit page to pre-fill the snippet ID
export async function updateSnippet(id: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const tagNames = JSON.parse(
    (formData.get("tags") as string) || "[]"
  ) as string[];

  const { error } = await supabase
    .from("snippets")
    .update({
      title: formData.get("title") as string,
      description: (formData.get("description") as string) || null,
      code: formData.get("code") as string,
      language: formData.get("language") as string,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  // Simplest approach: wipe existing tag links and re-sync
  await supabase.from("snippet_tags").delete().eq("snippet_id", id);
  await syncTags(supabase, id, user.id, tagNames);

  revalidatePath("/snippets");
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase.from("snippets").delete().eq("id", id).eq("user_id", user.id);

  revalidatePath("/snippets");
  redirect("/snippets");
}

// Upsert tags by name, then link them to the snippet
async function syncTags(
  supabase: SupabaseClient,
  snippetId: string,
  userId: string,
  tagNames: string[]
) {
  if (tagNames.length === 0) return;

  const { data: tags } = await supabase
    .from("tags")
    .upsert(
      tagNames.map((name) => ({ user_id: userId, name })),
      { onConflict: "user_id,name" }
    )
    .select();

  if (tags && tags.length > 0) {
    await supabase
      .from("snippet_tags")
      .insert(tags.map((tag) => ({ snippet_id: snippetId, tag_id: tag.id })));
  }
}
