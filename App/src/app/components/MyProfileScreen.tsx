import { 
  Edit, 
  Mail, 
  User, 
  Globe, 
  MapPin, 
  BookOpen, 
  TrendingUp, 
  Award, 
  Lock, 
  Settings, 
  HelpCircle, 
  Shield, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { BottomNav } from './BottomNav';
import type { Screen } from '../App';

interface MyProfileScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function MyProfileScreen({ onNavigate }: MyProfileScreenProps) {
  // Mock user data
  const user = {
    name: 'Sarah Müller',
    email: 'sarah.mueller@email.com',
    username: '@sarahm',
    bio: 'Language enthusiast | Love connecting with people from around the world 🌍',
    country: 'Germany',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    nativeLanguages: ['German'],
    learningLanguages: ['Spanish', 'Japanese', 'French'],
    level: 'Intermediate',
    points: 2450,
    streak: 28,
    badges: ['🏆', '⭐', '🎯', '🔥', '💎']
  };

  return (
    <div className="h-full flex flex-col bg-[#F7F3ED]">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Header Section with Avatar */}
        <div className="bg-gradient-to-br from-[#3B827E] to-[#2a6360] px-6 pt-12 pb-8">
          <div className="flex flex-col items-center">
            {/* Avatar */}
            <div className="relative mb-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors">
                <Edit size={18} className="text-[#3B827E]" />
              </button>
            </div>

            {/* Name and Bio */}
            <h1 className="text-white text-center mb-2">{user.name}</h1>
            <p className="text-white/90 text-center text-sm px-6 mb-4">
              {user.bio}
            </p>

            {/* Edit Profile Button */}
            <button 
              onClick={() => {/* Handle edit profile */}}
              className="px-6 py-2.5 bg-white text-[#3B827E] rounded-full flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-md"
            >
              <Edit size={16} />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Content Sections */}
        <div className="px-6 py-6 space-y-6">
          {/* Account Information */}
          <div className="space-y-2">
            <h3 className="text-gray-500 text-xs uppercase tracking-wider px-2 mb-3">
              Account Information
            </h3>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="px-4 py-4 flex items-center gap-3 border-b border-gray-100">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                  <Mail size={18} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-gray-800">{user.email}</p>
                </div>
              </div>

              <div className="px-4 py-4 flex items-center gap-3 border-b border-gray-100">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                  <User size={18} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Username</p>
                  <p className="text-gray-800">{user.username}</p>
                </div>
              </div>

              <div className="px-4 py-4 flex items-center gap-3 border-b border-gray-100">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                  <MapPin size={18} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Country</p>
                  <p className="text-gray-800">{user.country}</p>
                </div>
              </div>

              <div className="px-4 py-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                  <Globe size={18} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Native Languages</p>
                  <p className="text-gray-800">{user.nativeLanguages.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Learning & Activity */}
          <div className="space-y-2">
            <h3 className="text-gray-500 text-xs uppercase tracking-wider px-2 mb-3">
              Learning & Activity
            </h3>

            {/* Languages */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={18} className="text-[#3B827E]" />
                <p className="text-gray-800">Learning Languages</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {user.learningLanguages.map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1.5 bg-[#3B827E]/10 text-[#3B827E] rounded-full text-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Progress Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                <TrendingUp size={20} className="text-[#3B827E] mx-auto mb-1" />
                <p className="text-gray-800">{user.level}</p>
                <p className="text-xs text-gray-500">Level</p>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                <Award size={20} className="text-amber-500 mx-auto mb-1" />
                <p className="text-gray-800">{user.points}</p>
                <p className="text-xs text-gray-500">Points</p>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                <div className="text-xl mb-1">🔥</div>
                <p className="text-gray-800">{user.streak}</p>
                <p className="text-xs text-gray-500">Day Streak</p>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Award size={18} className="text-[#3B827E]" />
                <p className="text-gray-800">Achievements</p>
              </div>
              <div className="flex gap-3">
                {user.badges.map((badge, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-2xl shadow-sm"
                  >
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preferences & Actions */}
          <div className="space-y-2">
            <h3 className="text-gray-500 text-xs uppercase tracking-wider px-2 mb-3">
              Preferences & Actions
            </h3>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <button
                onClick={() => {/* Handle edit profile */}}
                className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                    <Edit size={18} className="text-gray-600" />
                  </div>
                  <span className="text-gray-800">Edit Profile</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>

              <button
                onClick={() => {/* Handle change password */}}
                className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                    <Lock size={18} className="text-gray-600" />
                  </div>
                  <span className="text-gray-800">Change Password</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>

              <button
                onClick={() => onNavigate('settings')}
                className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                    <Settings size={18} className="text-gray-600" />
                  </div>
                  <span className="text-gray-800">Account Settings</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Support & Account Actions */}
          <div className="space-y-2">
            <h3 className="text-gray-500 text-xs uppercase tracking-wider px-2 mb-3">
              Support & Account
            </h3>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <button
                onClick={() => {/* Handle help */}}
                className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                    <HelpCircle size={18} className="text-gray-600" />
                  </div>
                  <span className="text-gray-800">Help / Support</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>

              <button
                onClick={() => {/* Handle privacy */}}
                className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                    <Shield size={18} className="text-gray-600" />
                  </div>
                  <span className="text-gray-800">Privacy & Security</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Logout Button */}
          <div className="pt-4 pb-6">
            <button
              onClick={() => onNavigate('login')}
              className="w-full bg-white rounded-2xl px-4 py-4 flex items-center justify-center gap-3 hover:bg-red-50 transition-colors shadow-sm border border-gray-100 group"
            >
              <LogOut size={20} className="text-red-500" />
              <span className="text-red-500">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <BottomNav currentScreen="profile" onNavigate={onNavigate} />
    </div>
  );
}
