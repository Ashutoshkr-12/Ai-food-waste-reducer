'use client';

import { Home, Camera, BookOpen, Users, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();
  
  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/scanFridge', icon: Camera, label: 'Scan' },
    { path: '/recipeDetail', icon: BookOpen, label: 'Recipes' },
    { path: '/community', icon: Users, label: 'Community' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#FFFCF8]/95 backdrop-blur-2xl border-t-2 border-gray-100 z-50 shadow-2xl">
      <div className="max-w-md mx-auto flex justify-around items-center h-20 px-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = pathname === path;
          return (
            <Link
              key={path}
              href={path}
              className="relative flex flex-col items-center justify-center flex-1 h-full"
            >
              <div className="relative">
                {/* Active background with beautiful linear */}
                {isActive && (
                  <div className="absolute -inset-4 bg-linear-to-br from-emerald-400 via-green-500 to-teal-500 rounded-[1.25rem] -z-10 shadow-xl" />
                )}
                
                {/* Icon container */}
                <div className={`flex flex-col items-center justify-center px-5 py-2.5 rounded-[1.25rem] ${
                  isActive ? 'text-white -translate-y-1' : 'text-gray-500'
                }`}>
                  <Icon className={`w-6 h-6 mb-1 ${isActive ? 'drop-shadow-lg' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
                  <span className={`text-xs font-semibold ${isActive ? 'font-bold' : ''}`}>{label}</span>
                </div>

                {/* Active indicator dot */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#FFFCF8] rounded-full shadow-lg" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}