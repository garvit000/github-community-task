'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Plus, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
  onCreatePost: () => void;
}

export default function Layout({ children, onCreatePost }: LayoutProps) {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                BlogSpace
              </h1>
            </motion.div>

            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCreatePost}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                <Plus className="w-4 h-4" />
                New Post
              </motion.button>

              <div className="flex items-center gap-3">
                <div className="text-white">
                  Welcome, <span className="font-semibold">{user?.displayName}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <LogOut className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/5 backdrop-blur-lg border-t border-white/20"
            >
              <div className="px-4 py-4 space-y-4">
                <button
                  onClick={() => {
                    onCreatePost();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  <Plus className="w-4 h-4" />
                  New Post
                </button>

                <div className="flex items-center justify-between">
                  <div className="text-white">
                    Welcome, <span className="font-semibold">{user?.displayName}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
