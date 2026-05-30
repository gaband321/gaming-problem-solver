// Server-side Supabase client — used in Server Components and Route Handlers
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Returns null when Supabase env vars aren't configured (prevents 500s on pages that guard themselves)
export async function createClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Silently ignore — setAll can be called from Server Components where writes are not allowed
          }
        },
      },
    }
  );
}
