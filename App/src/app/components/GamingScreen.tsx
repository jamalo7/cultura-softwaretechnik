import { ArrowLeft, Trophy, Star, Zap, Award, Crown } from 'lucide-react';
import { useState } from 'react';
import { BottomNav } from './BottomNav';
import type { Screen } from '../App';

interface GamingScreenProps {
  onNavigate: (screen: Screen) => void;
  onQuizStart: (quizId: string) => void;
  userPoints: number;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  avatar: string;
  badges: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
  icon: string;
}

const leaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    name: 'Maria Schmidt',
    points: 2850,
    avatar: 'https://i.pravatar.cc/150?img=1',
    badges: 12,
  },
  {
    rank: 2,
    name: 'Ahmed Hassan',
    points: 2720,
    avatar: 'https://i.pravatar.cc/150?img=2',
    badges: 10,
  },
  {
    rank: 3,
    name: 'Sophie Dubois',
    points: 2680,
    avatar: 'https://i.pravatar.cc/150?img=3',
    badges: 11,
  },
  {
    rank: 4,
    name: 'Carlos Rivera',
    points: 2540,
    avatar: 'https://i.pravatar.cc/150?img=4',
    badges: 9,
  },
  {
    rank: 5,
    name: 'Emma Wilson',
    points: 2420,
    avatar: 'https://i.pravatar.cc/150?img=5',
    badges: 8,
  },
  {
    rank: 6,
    name: 'Li Wei',
    points: 2350,
    avatar: 'https://i.pravatar.cc/150?img=6',
    badges: 10,
  },
  {
    rank: 7,
    name: 'Sarah (Du)',
    points: 2180,
    avatar: 'https://i.pravatar.cc/150?img=7',
    badges: 7,
  },
];

const challenges: Challenge[] = [
  {
    id: '1',
    title: 'Spanisch Vokabel-Quiz',
    description: '20 Fragen über alltägliche spanische Ausdrücke',
    points: 100,
    difficulty: 'Einfach',
    icon: '🇪🇸',
  },
  {
    id: '2',
    title: 'Kulturgeschichte: Italien',
    description: 'Teste dein Wissen über italienische Renaissance',
    points: 200,
    difficulty: 'Mittel',
    icon: '🇮🇹',
  },
  {
    id: '3',
    title: 'Weltküche Meisterschaft',
    description: 'Ordne Gerichte ihren Ursprungsländern zu',
    points: 150,
    difficulty: 'Mittel',
    icon: '🍽️',
  },
  {
    id: '4',
    title: 'Musik & Tanz Experte',
    description: 'Erkenne traditionelle Musikstile und Tänze',
    points: 250,
    difficulty: 'Schwer',
    icon: '🎵',
  },
];

export function GamingScreen({ onNavigate, onQuizStart, userPoints }: GamingScreenProps) {
  const [activeTab, setActiveTab] = useState<'challenges' | 'leaderboard'>('challenges');
  const userRank = leaderboard.find(entry => entry.name === 'Sarah (Du)');

  // Update user points in leaderboard
  const updatedLeaderboard = leaderboard.map(entry => 
    entry.name === 'Sarah (Du)' ? { ...entry, points: userPoints } : entry
  ).sort((a, b) => b.points - a.points).map((entry, index) => ({ ...entry, rank: index + 1 }));

  const updatedUserRank = updatedLeaderboard.find(entry => entry.name === 'Sarah (Du)');

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-6 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="text-gray-800 hover:text-[#3B827E] transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-gray-800">Gaming & Quiz</h1>
            <p className="text-gray-600 text-sm mt-1">
              Lerne spielerisch neue Kulturen
            </p>
          </div>
        </div>

        {/* User Stats Card */}
        {updatedUserRank && (
          <div className="bg-gradient-to-br from-[#3B827E] to-[#2d6663] rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img 
                  src={updatedUserRank.avatar} 
                  alt="Your Avatar" 
                  className="w-14 h-14 rounded-full border-2 border-white"
                />
                <div>
                  <p className="opacity-90 text-sm">Dein Rang</p>
                  <p className="text-2xl">#{updatedUserRank.rank}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="opacity-90 text-sm">Gesamtpunkte</p>
                <p className="text-2xl">{updatedUserRank.points}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award size={18} />
              <span className="text-sm">{updatedUserRank.badges} Abzeichen gesammelt</span>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('challenges')}
            className={`py-3 px-4 relative transition-colors ${
              activeTab === 'challenges'
                ? 'text-[#3B827E]'
                : 'text-gray-500'
            }`}
          >
            Herausforderungen
            {activeTab === 'challenges' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B827E]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`py-3 px-4 relative transition-colors ${
              activeTab === 'leaderboard'
                ? 'text-[#3B827E]'
                : 'text-gray-500'
            }`}
          >
            Rangliste
            {activeTab === 'leaderboard' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B827E]" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4 pb-24">
        {activeTab === 'challenges' ? (
          <div className="space-y-4">
            {/* Start New Quiz CTA */}
            <button className="w-full bg-gradient-to-br from-[#3B827E] to-[#2d6663] text-white rounded-2xl p-6 flex items-center justify-between hover:scale-[1.02] transition-transform">
              <div className="text-left">
                <p className="text-lg mb-1">Starte Neues Quiz</p>
                <p className="text-sm opacity-90">Sammle Punkte und steige auf!</p>
              </div>
              <Zap size={32} />
            </button>

            {/* Challenge List */}
            <div className="pt-2">
              <h3 className="text-gray-800 mb-3">Verfügbare Herausforderungen</h3>
              <div className="space-y-3">
                {challenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-[#3B827E] transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{challenge.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-gray-800 mb-1">{challenge.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {challenge.description}
                        </p>
                        <div className="flex items-center gap-3 flex-wrap">
                          <div className="flex items-center gap-1 text-sm">
                            <Star size={14} className="text-[#3B827E]" />
                            <span className="text-gray-700">{challenge.points} Punkte</span>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${
                              challenge.difficulty === 'Einfach'
                                ? 'bg-green-100 text-green-700'
                                : challenge.difficulty === 'Mittel'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {challenge.difficulty}
                          </span>
                        </div>
                      </div>
                      <button 
                        className="px-4 py-2 bg-[#3B827E] text-white rounded-xl text-sm hover:bg-[#2d6663] transition-colors"
                        onClick={() => onQuizStart(challenge.id)}
                      >
                        Start
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-gray-800 mb-4">Top Spieler</h3>
            {updatedLeaderboard.map((entry) => (
              <div
                key={entry.rank}
                className={`rounded-2xl p-4 flex items-center gap-4 ${
                  entry.name === 'Sarah (Du)'
                    ? 'bg-[#3B827E]/10 border-2 border-[#3B827E]'
                    : 'bg-white border border-gray-200'
                }`}
              >
                {/* Rank */}
                <div className="w-10 text-center">
                  {entry.rank <= 3 ? (
                    <div className="flex justify-center">
                      {entry.rank === 1 && <Crown size={24} className="text-yellow-500" />}
                      {entry.rank === 2 && <Crown size={24} className="text-gray-400" />}
                      {entry.rank === 3 && <Crown size={24} className="text-orange-600" />}
                    </div>
                  ) : (
                    <span className="text-gray-600">#{entry.rank}</span>
                  )}
                </div>

                {/* Avatar */}
                <img 
                  src={entry.avatar} 
                  alt={entry.name} 
                  className="w-12 h-12 rounded-full"
                />

                {/* Info */}
                <div className="flex-1">
                  <p className="text-gray-800">{entry.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Trophy size={14} className="text-[#3B827E]" />
                    <span className="text-sm text-gray-600">{entry.badges} Abzeichen</span>
                  </div>
                </div>

                {/* Points */}
                <div className="text-right">
                  <p className="text-[#3B827E]">{entry.points}</p>
                  <p className="text-xs text-gray-500">Punkte</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav currentScreen="dashboard" onNavigate={onNavigate} />
    </div>
  );
}