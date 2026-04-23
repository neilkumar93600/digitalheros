import type { Provider } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/lib/supabase/client";

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

async function signIn(email: string, password: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

async function signUp(email: string, password: string, fullName?: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${getBaseUrl()}/verify-email`,
      data: fullName ? { full_name: fullName } : undefined,
    },
  });
  if (error) throw error;
  return data;
}

async function signInWithOAuth(provider: Provider) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${getBaseUrl()}/dashboard`,
    },
  });
  if (error) throw error;
  return data;
}

async function resetPassword(email: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getBaseUrl()}/reset-password`,
  });
  if (error) throw error;
  return data;
}

async function updatePassword(password: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
  return data;
}

export const authService = {
  signIn,
  signUp,
  signInWithOAuth,
  resetPassword,
  updatePassword,
};
