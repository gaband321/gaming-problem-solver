// Handles the OAuth / email confirmation callback from Supabase
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/solve';

  if (code) {
    const supabase = await createClient();
    if (!supabase) return NextResponse.redirect(`${origin}/auth?error=Supabase not configured`);
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth?error=Could not confirm your account`);
}
