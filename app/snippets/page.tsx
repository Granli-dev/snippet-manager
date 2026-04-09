import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/(auth)/actions";

export default async function SnippetsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">My Snippets</h1>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-gray-500 hover:text-black transition-colors"
            >
              Sign out ({user?.email})
            </button>
          </form>
        </div>
        <p className="text-gray-500">No snippets yet — we'll build this next.</p>
      </div>
    </div>
  );
}
