import Link from "next/link";
import { login } from "../actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo mark */}
        <div className="text-center mb-8">
          <span className="text-4xl">⌗</span>
          <h1 className="text-xl font-bold text-zinc-100 mt-2">Snippet Manager</h1>
          <p className="text-zinc-500 text-sm mt-1">Sign in to your snippet library</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          {error && (
            <div className="bg-red-950 border border-red-800 text-red-300 text-sm rounded-lg px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form action={login} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1.5">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-500 text-white rounded-lg py-2.5 text-sm font-medium transition-colors mt-2"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-zinc-500">
            No account?{" "}
            <Link href="/signup" className="text-violet-400 hover:text-violet-300 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
