import { useState } from 'react';
import { 
  Search, 
  X, 
  MessageCircle, 
  GraduationCap, 
  User, 
  Globe, 
  TrendingUp,
  Clock,
  Users,
  Gamepad2,
  Heart
} from 'lucide-react';
import { BottomNav } from './BottomNav';
import type { Screen } from '../App';

interface SearchScreenProps {
  onNavigate: (screen: Screen) => void;
}

type FilterType = 'all' | 'chatrooms' | 'workshops' | 'users' | 'gaming';
type SortType = 'relevance' | 'popularity' | 'newest';

interface SearchResult {
  id: string;
  type: 'chatroom' | 'workshop' | 'user' | 'gaming';
  title: string;
  description: string;
  language?: string;
  country?: string;
  participants?: number;
  level?: string;
  icon: any;
  color: string;
}

export function SearchScreen({ onNavigate }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('relevance');
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Mock data for suggestions and results
  const popularChatrooms = [
    { id: '1', title: 'Spanish Conversation', participants: 245, language: 'Spanish' },
    { id: '2', title: 'German Learners', participants: 189, language: 'German' },
    { id: '3', title: 'Japanese Culture', participants: 156, language: 'Japanese' },
  ];

  const trendingWorkshops = [
    { id: '1', title: 'French Pronunciation', date: 'Today, 18:00', language: 'French' },
    { id: '2', title: 'Italian Cooking & Language', date: 'Tomorrow, 15:00', language: 'Italian' },
  ];

  const allResults: SearchResult[] = [
    {
      id: '1',
      type: 'chatroom',
      title: 'Spanish Conversation Club',
      description: '245 active members • Intermediate level',
      language: 'Spanish',
      participants: 245,
      icon: MessageCircle,
      color: '#3B827E'
    },
    {
      id: '2',
      type: 'workshop',
      title: 'French Pronunciation Masterclass',
      description: 'Today at 18:00 • Beginner friendly',
      language: 'French',
      icon: GraduationCap,
      color: '#8B5CF6'
    },
    {
      id: '3',
      type: 'user',
      title: 'Maria González',
      description: 'Native Spanish • Learning German',
      country: 'Spain',
      icon: User,
      color: '#EC4899'
    },
    {
      id: '4',
      type: 'chatroom',
      title: 'Japanese Language Exchange',
      description: '156 active members • All levels',
      language: 'Japanese',
      participants: 156,
      icon: MessageCircle,
      color: '#3B827E'
    },
    {
      id: '5',
      type: 'gaming',
      title: 'Language Quiz Challenge',
      description: 'Multiplayer • All languages',
      icon: Gamepad2,
      color: '#F59E0B'
    },
    {
      id: '6',
      type: 'workshop',
      title: 'Italian Cooking & Conversation',
      description: 'Tomorrow at 15:00 • Intermediate',
      language: 'Italian',
      icon: GraduationCap,
      color: '#8B5CF6'
    },
  ];

  const filterButtons = [
    { id: 'all' as FilterType, label: 'All', icon: Globe },
    { id: 'chatrooms' as FilterType, label: 'Chatrooms', icon: MessageCircle },
    { id: 'workshops' as FilterType, label: 'Workshops', icon: GraduationCap },
    { id: 'users' as FilterType, label: 'Users', icon: User },
    { id: 'gaming' as FilterType, label: 'Gaming', icon: Gamepad2 },
  ];

  const filteredResults = allResults.filter(result => {
    const matchesQuery = searchQuery === '' || 
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || result.type === activeFilter;
    
    return matchesQuery && matchesFilter;
  });

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="h-full flex flex-col bg-[#F7F3ED]">
      {/* Header with Search Bar */}
      <div className="bg-white border-b border-gray-200 px-6 pt-6 pb-4 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chatrooms, workshops, users, languages…"
            className="w-full pl-12 pr-12 py-3.5 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#3B827E]/20 transition-all text-gray-800 placeholder:text-gray-400"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
            >
              <X size={14} className="text-white" />
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
          {filterButtons.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#3B827E] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon size={16} />
                <span className="text-sm">{filter.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sort By */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            {filteredResults.length} results found
          </p>
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="text-xs text-[#3B827E] flex items-center gap-1 hover:underline"
            >
              Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
            </button>
            {showSortMenu && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-10 min-w-[140px]">
                {(['relevance', 'popularity', 'newest'] as SortType[]).map((sort) => (
                  <button
                    key={sort}
                    onClick={() => {
                      setSortBy(sort);
                      setShowSortMenu(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors ${
                      sortBy === sort ? 'text-[#3B827E] bg-[#3B827E]/5' : 'text-gray-700'
                    }`}
                  >
                    {sort.charAt(0).toUpperCase() + sort.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pb-32">
        {searchQuery === '' ? (
          // Initial State - Suggestions
          <div className="px-6 py-6 space-y-6">
            {/* Popular Chatrooms */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={18} className="text-[#3B827E]" />
                <h3 className="text-gray-800">Popular Chatrooms</h3>
              </div>
              <div className="space-y-3">
                {popularChatrooms.map((chatroom) => (
                  <button
                    key={chatroom.id}
                    className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow border border-gray-100"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3B827E] to-[#2a6360] flex items-center justify-center">
                      <MessageCircle size={20} className="text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-gray-800">{chatroom.title}</p>
                      <p className="text-sm text-gray-500">
                        {chatroom.participants} members • {chatroom.language}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Workshops */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={18} className="text-purple-600" />
                <h3 className="text-gray-800">Trending Workshops</h3>
              </div>
              <div className="space-y-3">
                {trendingWorkshops.map((workshop) => (
                  <button
                    key={workshop.id}
                    className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow border border-gray-100"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
                      <GraduationCap size={20} className="text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-gray-800">{workshop.title}</p>
                      <p className="text-sm text-gray-500">
                        {workshop.date} • {workshop.language}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recently Searched */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock size={18} className="text-gray-500" />
                <h3 className="text-gray-800">Recent Searches</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Spanish', 'Beginner workshops', 'Language exchange', 'German grammar'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-4 py-2 bg-white rounded-full text-sm text-gray-600 hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : filteredResults.length > 0 ? (
          // Search Results
          <div className="px-6 py-6 space-y-3">
            {filteredResults.map((result) => {
              const Icon = result.icon;
              return (
                <button
                  key={result.id}
                  className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${result.color}, ${result.color}dd)` }}
                  >
                    <Icon size={20} className="text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-800">{result.title}</p>
                    <p className="text-sm text-gray-500">{result.description}</p>
                  </div>
                  {result.type === 'chatroom' && result.participants && (
                    <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full">
                      <Users size={14} className="text-gray-500" />
                      <span className="text-xs text-gray-600">{result.participants}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center px-6 py-20">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-800 text-center mb-2">No results found</p>
            <p className="text-gray-500 text-sm text-center">
              Try a different search or filter
            </p>
          </div>
        )}
      </div>

      <BottomNav currentScreen="search" onNavigate={onNavigate} />
    </div>
  );
}
