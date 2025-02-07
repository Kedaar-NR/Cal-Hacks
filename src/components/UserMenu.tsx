import React from 'react';
import { LogOut, Settings, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface UserMenuProps {
  user: {
    email: string;
    user_metadata: {
      avatar_url: string;
      full_name: string;
    };
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-2">
        <img
          src={user.user_metadata.avatar_url}
          alt={user.user_metadata.full_name}
          className="w-8 h-8 rounded-full"
        />
        <span className="hidden md:inline">{user.user_metadata.full_name}</span>
      </button>

      <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <User className="w-4 h-4" />
          <span>Profile</span>
        </button>
        <button
          onClick={() => navigate('/settings')}
          className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
        <hr className="my-2 border-gray-200 dark:border-gray-700" />
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
}