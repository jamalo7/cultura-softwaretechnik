import { Filter, Search, Home, Settings, User } from 'lucide-react';
import { useState } from 'react';
import type { Screen } from '../App';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const [showSearchTooltip, setShowSearchTooltip] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const navItems = [
    { id: 'filter', icon: Filter, label: 'Filter' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
      {/* Filter Options Popover */}
      {showFilterOptions && (
        <div className="absolute bottom-20 left-6 bg-white rounded-xl shadow-2xl p-4 border border-gray-200 w-48 z-50">
          <p className="text-gray-500 text-xs mb-3">Filter by:</p>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm">
              Language
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm">
              Country
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm">
              Skill Level
            </button>
          </div>
        </div>
      )}

      {/* Search Tooltip */}
      {showSearchTooltip && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-gray-800 text-white rounded-xl shadow-2xl px-4 py-2 z-50 whitespace-nowrap text-xs">
          Search languages, users, or topics
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
        </div>
      )}

      <div className="flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          // Filter button special case
          if (item.id === 'filter') {
            return (
              <button
                key={item.id}
                onClick={() => setShowFilterOptions(!showFilterOptions)}
                onBlur={() => setTimeout(() => setShowFilterOptions(false), 200)}
                className="flex flex-col items-center gap-1 relative"
              >
                <Icon 
                  size={24} 
                  className={showFilterOptions ? 'text-[#3B827E]' : 'text-gray-400'}
                  strokeWidth={showFilterOptions ? 2.5 : 2}
                />
              </button>
            );
          }

          // Search button special case
          if (item.id === 'search') {
            return (
              <button
                key={item.id}
                onMouseEnter={() => setShowSearchTooltip(true)}
                onMouseLeave={() => setShowSearchTooltip(false)}
                onClick={() => onNavigate(item.id as Screen)}
                className="flex flex-col items-center gap-1 relative"
              >
                <Icon 
                  size={24} 
                  className={isActive ? 'text-[#3B827E]' : 'text-gray-400'}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </button>
            );
          }
          
          // Profile icon special case
          if (item.id === 'profile') {
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as Screen)}
                className="flex flex-col items-center gap-1"
              >
                <div className={`w-8 h-8 rounded-full ${isActive ? 'bg-[#3B827E] ring-2 ring-[#3B827E] ring-offset-2' : 'bg-[#3B827E]'} flex items-center justify-center transition-all`}>
                  <Icon size={16} className="text-white" />
                </div>
              </button>
            );
          }
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as Screen)}
              className="flex flex-col items-center gap-1"
            >
              <Icon 
                size={24} 
                className={isActive ? 'text-[#3B827E]' : 'text-gray-400'}
                strokeWidth={isActive ? 2.5 : 2}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}