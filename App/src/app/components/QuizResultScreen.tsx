import { Trophy, Star, RotateCcw, ArrowLeft } from 'lucide-react';
import type { Screen } from '../App';

interface QuizResultScreenProps {
  quizTitle: string;
  quizIcon: string;
  score: number;
  totalQuestions: number;
  earnedPoints: number;
  onNavigate: (screen: Screen) => void;
  onRetakeQuiz: () => void;
  onBackToGaming: () => void;
}

export function QuizResultScreen({
  quizTitle,
  quizIcon,
  score,
  totalQuestions,
  earnedPoints,
  onNavigate,
  onRetakeQuiz,
  onBackToGaming,
}: QuizResultScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPerfectScore = score === totalQuestions;
  const isGoodScore = percentage >= 60;

  return (
    <div className="h-full flex flex-col bg-[#F7F3ED]">
      {/* Header */}
      <div className="px-6 py-6 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('gaming')}
            className="text-gray-800 hover:text-[#3B827E] transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-gray-800">Quiz Ergebnis</h1>
          </div>
        </div>
      </div>

      {/* Result Content */}
      <div className="flex-1 px-6 py-8 overflow-y-auto pb-24 flex flex-col items-center justify-center">
        {/* Icon and Title */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">{quizIcon}</div>
          <h2 className="text-gray-800 text-xl mb-2">{quizTitle}</h2>
        </div>

        {/* Score Card */}
        <div className="w-full bg-white rounded-3xl p-8 shadow-lg border border-gray-200 mb-6">
          {/* Trophy Icon */}
          <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
            isPerfectScore
              ? 'bg-gradient-to-br from-yellow-400 to-yellow-600'
              : isGoodScore
              ? 'bg-gradient-to-br from-[#3B827E] to-[#2d6663]'
              : 'bg-gradient-to-br from-gray-400 to-gray-600'
          }`}>
            <Trophy className="text-white" size={40} />
          </div>

          {/* Score */}
          <div className="text-center mb-6">
            <h3 className="text-gray-800 text-2xl mb-2">
              Du hast {score}/{totalQuestions} richtig!
            </h3>
            <p className={`text-lg ${
              isPerfectScore
                ? 'text-yellow-600'
                : isGoodScore
                ? 'text-[#3B827E]'
                : 'text-gray-600'
            }`}>
              {isPerfectScore
                ? '🎉 Perfekt! Du bist ein Experte!'
                : isGoodScore
                ? '👏 Sehr gut gemacht!'
                : '💪 Weiter üben!'}
            </p>
          </div>

          {/* Points Earned */}
          <div className="bg-gradient-to-br from-[#3B827E] to-[#2d6663] rounded-2xl p-6 text-white text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="text-yellow-400" size={24} fill="currentColor" />
              <span className="text-3xl">+{earnedPoints}</span>
            </div>
            <p className="text-sm opacity-90">Punkte gewonnen</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          <button
            onClick={onBackToGaming}
            className="w-full py-4 bg-gradient-to-r from-[#3B827E] to-[#2d6663] text-white rounded-2xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            Zurück zu Gaming & Quiz
          </button>

          <button
            onClick={onRetakeQuiz}
            className="w-full py-4 bg-white text-[#3B827E] border-2 border-[#3B827E] rounded-2xl hover:bg-[#3B827E]/5 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw size={20} />
            Quiz wiederholen
          </button>
        </div>

        {/* Statistics */}
        <div className="w-full mt-8 grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
            <p className="text-2xl text-[#3B827E] mb-1">{score}</p>
            <p className="text-xs text-gray-600">Richtig</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
            <p className="text-2xl text-red-500 mb-1">{totalQuestions - score}</p>
            <p className="text-xs text-gray-600">Falsch</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
            <p className="text-2xl text-gray-800 mb-1">{percentage}%</p>
            <p className="text-xs text-gray-600">Genauigkeit</p>
          </div>
        </div>
      </div>
    </div>
  );
}
