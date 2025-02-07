import React from 'react';
import { Link } from 'react-router-dom';
import { Keyboard } from 'lucide-react';
import { AuthButton } from './AuthButton';
import { UserMenu } from './UserMenu';
import { useAuth } from '../hooks/useAuth';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Keyboard className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold">TypeMaster</h1>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              to="/practice"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Practice
            </Link>
            {user && (
              <>
                <Link
                  to="/profile"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Profile
                </Link>
                <Link
                  to="/leaderboard"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Leaderboard
                </Link>
              </>
            )}
            {user ? <UserMenu user={user} /> : <AuthButton />}
          </nav>
        </div>
      </div>
    </header>
  );
}