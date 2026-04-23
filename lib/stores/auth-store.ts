import { create } from "zustand";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { User, Session } from "@supabase/supabase-js";
type Profile = Record<string, any>;

interface AuthState {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  setLoading: (loading: boolean) => void;
  initialize: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  setProfile: (profile) => set({ profile }),

  setLoading: (isLoading) => set({ isLoading }),

  initialize: async () => {
    try {
      const supabase = getSupabaseClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error("Error fetching profile in initialize:", profileError);
        }

        set({
          user,
          profile: profile as Profile | null,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({
          user: null,
          profile: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event: any, session: Session | null) => {
        if (event === "SIGNED_IN" && session?.user) {
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("user_id", session.user.id)
            .single();

          if (profileError && profileError.code !== 'PGRST116') {
            console.error("Error fetching profile on state change:", profileError);
          }

          set({
            user: session.user,
            profile: profile as Profile | null,
            isAuthenticated: true,
            isLoading: false,
          });
        } else if (event === "SIGNED_OUT") {
          set({
            user: null,
            profile: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      });
    } catch {
      set({ user: null, profile: null, isAuthenticated: false, isLoading: false });
    }
  },

  logout: async () => {
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
    set({
      user: null,
      profile: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },
}));
