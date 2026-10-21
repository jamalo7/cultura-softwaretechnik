import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';
import type { Screen } from '../App';

interface QuizScreenProps {
  quizId: string;
  quizTitle: string;
  quizIcon: string;
  questions: QuizQuestion[];
  onNavigate: (screen: Screen) => void;
  onQuizComplete: (score: number, totalQuestions: number, earnedPoints: number) => void;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export function QuizScreen({ 
  quizId, 
  quizTitle, 
  quizIcon, 
  questions, 
  onNavigate,
  onQuizComplete 
}: QuizScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const pointsPerQuestion = 20;

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return; // Prevent changing answer after selection

    setSelectedAnswer(index);
    setShowFeedback(true);

    if (index === currentQuestion.correctIndex) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Quiz completed
      const earnedPoints = correctAnswers * pointsPerQuestion;
      if (selectedAnswer === currentQuestion.correctIndex) {
        onQuizComplete(correctAnswers + 1, questions.length, earnedPoints + pointsPerQuestion);
      } else {
        onQuizComplete(correctAnswers, questions.length, earnedPoints);
      }
    } else {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#F7F3ED]">
      {/* Header */}
      <div className="px-6 py-6 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => onNavigate('gaming')}
            className="text-gray-800 hover:text-[#3B827E] transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{quizIcon}</span>
              <h1 className="text-gray-800">{quizTitle}</h1>
            </div>
          </div>
        </div>

        {/* Progress and Points Info */}
        <div className="flex items-center justify-between">
          <div className="text-gray-600">
            <span className="text-[#3B827E]">Frage {currentQuestionIndex + 1}</span> von {questions.length}
          </div>
          <div className="text-sm text-gray-600">
            +{pointsPerQuestion} Punkte pro richtige Antwort
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#3B827E] to-[#2d6663] transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto pb-24">
        {/* Question */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-200">
          <h2 className="text-gray-800 text-lg leading-relaxed">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctIndex;
            const showCorrect = showFeedback && isCorrect;
            const showIncorrect = showFeedback && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showFeedback}
                className={`w-full p-5 rounded-2xl text-left transition-all duration-200 ${
                  showCorrect
                    ? 'bg-green-100 border-2 border-green-500'
                    : showIncorrect
                    ? 'bg-red-100 border-2 border-red-500'
                    : isSelected
                    ? 'bg-[#3B827E]/10 border-2 border-[#3B827E]'
                    : 'bg-white border-2 border-gray-200 hover:border-[#3B827E] hover:bg-[#3B827E]/5'
                } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-gray-800 ${
                    showCorrect ? 'text-green-700' : showIncorrect ? 'text-red-700' : ''
                  }`}>
                    {option}
                  </span>
                  {showCorrect && <CheckCircle2 className="text-green-600" size={24} />}
                  {showIncorrect && <XCircle className="text-red-600" size={24} />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback Message */}
        {showFeedback && (
          <div className={`mt-6 p-4 rounded-2xl ${
            selectedAnswer === currentQuestion.correctIndex
              ? 'bg-green-100 border border-green-300'
              : 'bg-red-100 border border-red-300'
          }`}>
            <div className="flex items-center gap-2">
              {selectedAnswer === currentQuestion.correctIndex ? (
                <>
                  <CheckCircle2 className="text-green-600" size={20} />
                  <span className="text-green-700">Richtig! +{pointsPerQuestion} Punkte</span>
                </>
              ) : (
                <>
                  <XCircle className="text-red-600" size={20} />
                  <span className="text-red-700">Leider falsch. Die richtige Antwort ist: {currentQuestion.options[currentQuestion.correctIndex]}</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Next Button */}
        {showFeedback && (
          <button
            onClick={handleNextQuestion}
            className="w-full mt-6 py-4 bg-gradient-to-r from-[#3B827E] to-[#2d6663] text-white rounded-2xl hover:scale-[1.02] transition-transform"
          >
            {isLastQuestion ? 'Quiz beenden' : 'Nächste Frage'}
          </button>
        )}
      </div>
    </div>
  );
}
