import { Heart } from 'lucide-react';
import { Profile } from './MatchmakingScreen';

interface MatchOverlayProps {
  profile: Profile;
  onChat: () => void;
  onContinue: () => void;
}

export function MatchOverlay({ profile, onChat, onContinue }: MatchOverlayProps) {
  return (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50 p-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl">
        <div className="text-center">
          {/* Success Icon */}
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-in zoom-in duration-500">
              <Heart size={48} className="text-white" fill="white" />
            </div>
            {/* Sparkles effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-pink-300 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>

          <h2 className="text-gray-800 mb-2">Match!</h2>
          <p className="text-gray-600 mb-8">
            Ihr habt euch beide gelikt.
          </p>

          {/* Profile Preview */}
          <div className="flex items-center justify-center gap-3 mb-8 p-4 bg-[#F7F3ED] rounded-2xl">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
              <img 
                src={profile.photo} 
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <p className="text-gray-800">{profile.name}, {profile.age}</p>
              <p className="text-sm text-gray-600">{profile.location}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={onChat}
              className="w-full py-4 bg-[#3B827E] text-white rounded-2xl hover:bg-[#2d6663] transition-all active:scale-[0.98] shadow-lg"
            >
              Nachricht schreiben
            </button>
            <button
              onClick={onContinue}
              className="w-full py-4 bg-white text-[#3B827E] rounded-2xl border-2 border-[#3B827E] hover:bg-[#F7F3ED] transition-all active:scale-[0.98]"
            >
              Weiteres Profil anzeigen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}