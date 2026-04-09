import Link from "next/link";
import { login } from "../actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
        <p className="text-gray-500 text-sm mb-6">Sign in to your snippet library</p>

        {error && (
          <div className="bg-red-50 text-red-700 text-sm rounded px-4 py-3 mb-4">
            {error}
          </div>
        )}

        {/* action={login} wires the form directly to the Server Action.
            No fetch, no API route — Next.js handles it. */}
        <form action={login} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white rounded-md py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-500">
          No account?{" "}
          <Link href="/signup" className="text-black underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
