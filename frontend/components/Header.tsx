import { ArrowLeft, Bell, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';


interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showNotifications?: boolean;
  showSettings?: boolean;
}

export default function Header({ title, showBack = false, showNotifications = false, showSettings = false }: HeaderProps) {
  const navigate = useRouter();

  return (
    <header className="bg-[#FFFCF8]/95 backdrop-blur-2xl border-b-2 border-gray-100 sticky top-0 z-40 shadow-lg">
      <div className="max-w-md mx-auto px-4 h-18 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => navigate.back()}
              className="p-3 -ml-2 text-gray-700 hover:bg-linear-to-br hover:from-emerald-50 hover:to-green-50 rounded-xl border border-transparent hover:border-emerald-200"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          {title && (
            <h1 className="font-bold text-2xl bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {title}
            </h1>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {showNotifications && (
            <button className="relative p-3 text-gray-600 hover:bg-linear-to-br hover:from-emerald-50 hover:to-green-50 rounded-xl border border-transparent hover:border-emerald-200">
              <Bell className="w-6 h-6" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-linear-to-br from-red-500 to-orange-600 rounded-full border-2 border-[#FFFCF8] shadow-lg" />
            </button>
          )}
          {showSettings && (
            <button className="p-3 text-gray-600 hover:bg-linear-to-br hover:from-emerald-50 hover:to-green-50 rounded-xl border border-transparent hover:border-emerald-200">
              <Settings className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}