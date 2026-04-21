import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase URL and Anon Key are required. Please check your .env.local file."
    );
  }

  return createBrowserClient(url, key);
}

// Lazy initialization - only create when actually used
let clientInstance: ReturnType<typeof createClient> | null = null;

export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(_, prop) {
    if (!clientInstance) {
      clientInstance = createClient();
    }
    return clientInstance[prop as keyof typeof clientInstance];
  },
});
