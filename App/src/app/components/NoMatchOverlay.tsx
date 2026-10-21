import { X } from 'lucide-react';

interface NoMatchOverlayProps {
  onContinue: () => void;
}

export function NoMatchOverlay({ onContinue }: NoMatchOverlayProps) {
  return (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50 p-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl">
        <div className="text-center">
          {/* Error Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <X size={40} className="text-white" strokeWidth={3} />
          </div>

          <h2 className="text-gray-800 mb-2">Kein Match</h2>
          <p className="text-gray-600 mb-8">
            Die andere Person hat noch nicht zugestimmt.
          </p>

          <button
            onClick={onContinue}
            className="w-full py-4 bg-[#3B827E] text-white rounded-2xl hover:bg-[#2d6663] transition-all active:scale-[0.98] shadow-lg"
          >
            Weiter
          </button>
        </div>
      </div>
    </div>
  );
}
