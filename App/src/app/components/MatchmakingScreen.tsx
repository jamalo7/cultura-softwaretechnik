import { useState } from 'react';
import { X, Heart, MapPin, Briefcase, Globe } from 'lucide-react';
import { BottomNav } from './BottomNav';
import type { Screen } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MatchmakingScreenProps {
  onNavigate: (screen: Screen) => void;
  onMatch: (profile: Profile) => void;
  onNoMatch: () => void;
}

export interface Profile {
  id: number;
  name: string;
  age: number;
  photo: string;
  profession: string;
  location: string;
  languages: string[];
  interests: string[];
  mutualMatch: boolean;
}

const profiles: Profile[] = [
  {
    id: 1,
    name: 'Alexander',
    age: 28,
    photo: 'https://images.unsplash.com/photo-1611695434398-4f4b330623e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHBvcnRyYWl0JTIwc21pbGV8ZW58MXx8fHwxNzY0NjE3ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    profession: 'Software Entwickler',
    location: 'Berlin, Deutschland',
    languages: ['Deutsch', 'Englisch', 'Spanisch'],
    interests: ['Reisen', 'Kochen', 'Fotografie'],
    mutualMatch: true,
  },
  {
    id: 2,
    name: 'Sofia',
    age: 26,
    photo: 'https://images.unsplash.com/photo-1557353425-09253747c2bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwcG9ydHJhaXQlMjBzbWlsZXxlbnwxfHx8fDE3NjkxNjEzMjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    profession: 'Marketing',
    location: 'Madrid, Spanien',
    languages: ['Spanisch', 'Englisch'],
    interests: ['Kultur', 'Tanzen', 'Reisen'],
    mutualMatch: true,
  },
  {
    id: 3,
    name: 'Youssef',
    age: 30,
    photo: 'https://images.unsplash.com/photo-1543132220-e7fef0b974e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHBvcnRyYWl0JTIwY2FzdWFsfGVufDF8fHx8MTc2OTA4NzI0NHww&ixlib=rb-4.1.0&q=80&w=1080',
    profession: 'Student',
    location: 'Casablanca, Marokko',
    languages: ['Arabisch', 'Französisch', 'Deutsch'],
    interests: ['Kochen', 'Musik', 'Sprachen'],
    mutualMatch: false,
  },
];

export function MatchmakingScreen({ onNavigate, onMatch, onNoMatch }: MatchmakingScreenProps) {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [animation, setAnimation] = useState('');
  const [showEndState, setShowEndState] = useState(false);

  const currentProfile = profiles[currentProfileIndex];

  const handleReject = () => {
    setAnimation('slide-left');
    setTimeout(() => {
      if (currentProfileIndex < profiles.length - 1) {
        setCurrentProfileIndex((prev) => prev + 1);
      } else {
        setShowEndState(true);
      }
      setAnimation('');
    }, 300);
  };

  const handleAccept = () => {
    setAnimation('slide-right');
    setTimeout(() => {
      if (currentProfile.mutualMatch) {
        onMatch(currentProfile);
      } else {
        onNoMatch();
      }
      setAnimation('');
    }, 300);
  };

  const handleBackToMatchmaking = () => {
    setShowEndState(false);
    setCurrentProfileIndex(0);
  };

  if (showEndState) {
    return (
      <div className="h-full flex flex-col bg-[#F7F3ED]">
        {/* Header */}
        <div className="px-6 py-6 bg-white border-b border-gray-200">
          <h2 className="text-[#3B827E] text-center">Matchmaking</h2>
          <p className="text-gray-600 text-center text-sm mt-1">
            Finde neue Kulturpartner
          </p>
        </div>

        {/* End State */}
        <div className="flex-1 flex items-center justify-center px-6 pb-32">
          <div className="text-center max-w-sm">
            <div className="w-20 h-20 bg-[#3B827E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={40} className="text-[#3B827E]" />
            </div>
            <h2 className="text-gray-800 mb-3">Keine weiteren Vorschläge</h2>
            <p className="text-gray-600 mb-8">
              Bitte später erneut versuchen.
            </p>
            <button
              onClick={handleBackToMatchmaking}
              className="w-full py-4 bg-[#3B827E] text-white rounded-2xl hover:bg-[#2d6663] transition-colors"
            >
              Zurück
            </button>
          </div>
        </div>

        <BottomNav currentScreen="matchmaking" onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#F7F3ED]">
      {/* Header */}
      <div className="px-6 py-6 bg-white border-b border-gray-200">
        <h2 className="text-[#3B827E] text-center">Matchmaking</h2>
        <p className="text-gray-600 text-center text-sm mt-1">
          Finde neue Kulturpartner
        </p>
      </div>

      {/* Profile Card */}
      <div className="flex-1 flex items-center justify-center px-6 pb-32">
        <div 
          className={`w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
            animation === 'slide-left' ? 'translate-x-[-100%] opacity-0' : 
            animation === 'slide-right' ? 'translate-x-[100%] opacity-0' : 
            'translate-x-0 opacity-100'
          }`}
        >
          {/* Profile Image */}
          <div className="relative h-96">
            <ImageWithFallback
              src={currentProfile.photo}
              alt={currentProfile.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            
            {/* Name and Age Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-white mb-1">
                {currentProfile.name}, {currentProfile.age}
              </h3>
              <div className="flex items-center gap-2 text-sm opacity-90">
                <MapPin size={16} />
                <span>{currentProfile.location}</span>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Briefcase size={20} className="text-[#3B827E] mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">Beruf</p>
                <p className="text-gray-800">{currentProfile.profession}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Globe size={20} className="text-[#3B827E] mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">Sprachen</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {currentProfile.languages.map((lang) => (
                    <span
                      key={lang}
                      className="px-3 py-1 bg-[#F7F3ED] text-[#3B827E] rounded-full text-sm"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Heart size={20} className="text-[#3B827E] mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">Interessen</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {currentProfile.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 bg-[#F7F3ED] text-gray-700 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-24 left-0 right-0 px-6 flex items-center justify-center gap-6">
        <button
          onClick={handleReject}
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-2 border-[#E76844]"
        >
          <X size={32} className="text-[#E76844]" strokeWidth={2.5} />
        </button>

        <button
          onClick={handleAccept}
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-2 border-[#63B36D]"
        >
          <Heart size={28} className="text-[#63B36D]" fill="#63B36D" strokeWidth={2.5} />
        </button>
      </div>

      <BottomNav currentScreen="matchmaking" onNavigate={onNavigate} />
    </div>
  );
}