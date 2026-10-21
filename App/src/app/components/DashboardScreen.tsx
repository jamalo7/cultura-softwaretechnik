import { MessageCircle, GraduationCap, Heart, Sparkles, Gamepad2, Users } from 'lucide-react';
import { BottomNav } from './BottomNav';
import type { Screen } from '../App';

interface DashboardScreenProps {
  userName: string;
  onNavigate: (screen: Screen) => void;
}

export function DashboardScreen({ userName, onNavigate }: DashboardScreenProps) {
  const features = [
    {
      id: 'chat',
      title: 'Chatrooms',
      icon: MessageCircle,
      color: 'bg-gradient-to-br from-blue-400 to-blue-600',
      screen: 'chat' as Screen,
    },
    {
      id: 'workshops',
      title: 'Workshops',
      icon: GraduationCap,
      color: 'bg-gradient-to-br from-purple-400 to-purple-600',
      screen: 'workshops' as Screen,
    },
    {
      id: 'matchmaking',
      title: 'Matchmaking',
      icon: Heart,
      color: 'bg-gradient-to-br from-pink-400 to-pink-600',
      screen: 'matchmaking' as Screen,
    },
    {
      id: 'culturai',
      title: 'CulturAI',
      icon: Sparkles,
      color: 'bg-gradient-to-br from-teal-400 to-teal-600',
      screen: 'culturai' as Screen,
    },
    {
      id: 'gaming',
      title: 'Gaming',
      icon: Gamepad2,
      color: 'bg-gradient-to-br from-orange-400 to-orange-600',
      screen: 'gaming' as Screen,
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-8 py-8 bg-white border-b border-gray-200">
        <div>
          <h2 className="text-gray-800">
            Hallo {userName}...
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Willkommen zurück bei Cultura
          </p>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.id}
                onClick={() => onNavigate(feature.screen)}
                className={`${feature.color} rounded-2xl p-6 h-40 flex flex-col items-center justify-center gap-3 text-white hover:scale-105 transition-transform shadow-lg`}
              >
                <Icon size={40} strokeWidth={1.5} />
                <span className="text-center text-sm">{feature.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      <BottomNav currentScreen="dashboard" onNavigate={onNavigate} />
    </div>
  );
}