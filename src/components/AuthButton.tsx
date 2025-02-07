import React from 'react';
import { LogIn } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function AuthButton() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center gap-2 px-4 py-2 bg-white text-gray-800 rounded-lg shadow hover:bg-gray-50 transition-colors"
    >
      <LogIn className="w-5 h-5" />
      <span>Sign in with Google</span>
    </button>
  );
}