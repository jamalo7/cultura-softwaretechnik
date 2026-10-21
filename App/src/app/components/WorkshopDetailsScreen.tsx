import { ArrowLeft, Calendar, Clock, Users, MapPin, Globe } from 'lucide-react';
import { BottomNav } from './BottomNav';
import type { Screen } from '../App';

export interface Workshop {
  id: string;
  title: string;
  instructor: string;
  category: string;
  date: string;
  time: string;
  participants: number;
  maxParticipants: number;
  location: string;
  image: string;
  description?: string;
}

interface WorkshopDetailsScreenProps {
  workshop: Workshop;
  onNavigate: (screen: Screen) => void;
  onRegister: () => void;
  onShowError: () => void;
}

export function WorkshopDetailsScreen({ 
  workshop, 
  onNavigate, 
  onRegister,
  onShowError 
}: WorkshopDetailsScreenProps) {
  const progressPercentage = (workshop.participants / workshop.maxParticipants) * 100;
  const isFullyBooked = workshop.participants >= workshop.maxParticipants;
  const isOnline = workshop.location.toLowerCase() === 'online';

  const handleCTA = () => {
    if (isFullyBooked) {
      onShowError();
    } else {
      onRegister();
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#F7F3ED]">
      {/* Header */}
      <div className="px-6 py-6 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('workshops')}
            className="text-gray-800 hover:text-[#3B827E] transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-gray-800">Workshopdetails</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Cover Image */}
        <div className="h-56 overflow-hidden">
          <img
            src={workshop.image}
            alt={workshop.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Workshop Info */}
        <div className="px-6 py-6 space-y-6">
          {/* Title & Instructor */}
          <div>
            <h2 className="text-gray-800 mb-2">{workshop.title}</h2>
            <p className="text-gray-600">
              von {workshop.instructor}
            </p>
          </div>

          {/* Details Grid */}
          <div className="bg-white rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#3B827E]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar size={20} className="text-[#3B827E]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Datum</p>
                <p className="text-gray-800">{workshop.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#3B827E]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock size={20} className="text-[#3B827E]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Uhrzeit</p>
                <p className="text-gray-800">{workshop.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#3B827E]/10 rounded-full flex items-center justify-center flex-shrink-0">
                {isOnline ? (
                  <Globe size={20} className="text-[#3B827E]" />
                ) : (
                  <MapPin size={20} className="text-[#3B827E]" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Ort</p>
                <p className="text-gray-800">{workshop.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#3B827E]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Users size={20} className="text-[#3B827E]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Teilnehmer</p>
                <p className="text-gray-800">
                  {workshop.participants}/{workshop.maxParticipants} Teilnehmer
                </p>
              </div>
            </div>
          </div>

          {/* Participants Progress */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-700">Verfügbare Plätze</span>
              <span className="text-sm text-gray-900">
                {workshop.maxParticipants - workshop.participants} von {workshop.maxParticipants}
              </span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  isFullyBooked ? 'bg-red-500' : 'bg-[#3B827E]'
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            {isFullyBooked && (
              <p className="text-xs text-red-600 mt-2">
                Dieser Workshop ist ausgebucht
              </p>
            )}
          </div>

          {/* Description (if available) */}
          {workshop.description && (
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-gray-800 mb-2">Über den Workshop</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {workshop.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-20 left-0 right-0 px-6 py-4 bg-[#F7F3ED]">
        <div className="max-w-[430px] mx-auto">
          <button
            onClick={handleCTA}
            disabled={isFullyBooked}
            className={`w-full py-4 rounded-2xl text-white transition-all shadow-lg ${
              isFullyBooked
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#3B827E] hover:bg-[#2d6663] active:scale-[0.98]'
            }`}
          >
            {isFullyBooked ? 'Ausgebucht' : 'Anmeldung bestätigen'}
          </button>
        </div>
      </div>

      <BottomNav currentScreen="dashboard" onNavigate={onNavigate} />
    </div>
  );
}
