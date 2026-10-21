import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { RegistrationScreen } from './components/RegistrationScreen';
import { CountrySelectionScreen } from './components/CountrySelectionScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { ChatListScreen } from './components/ChatListScreen';
import { MatchmakingScreen, Profile } from './components/MatchmakingScreen';
import { MatchOverlay } from './components/MatchOverlay';
import { NoMatchOverlay } from './components/NoMatchOverlay';
import { ChatScreen } from './components/ChatScreen';
import { SocialFeedScreen } from './components/SocialFeedScreen';
import { WorkshopsScreen } from './components/WorkshopsScreen';
import { WorkshopDetailsScreen, Workshop } from './components/WorkshopDetailsScreen';
import { GamingScreen } from './components/GamingScreen';
import { QuizScreen } from './components/QuizScreen';
import { QuizResultScreen } from './components/QuizResultScreen';
import { CulturAIScreen } from './components/CulturAIScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { MyProfileScreen } from './components/MyProfileScreen';
import { SearchScreen } from './components/SearchScreen';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { getQuizById, type QuizData } from './components/quizData';

export type Screen = 'login' | 'registration' | 'country' | 'dashboard' | 'chat' | 'matchmaking' | 'match-chat' | 'social' | 'workshops' | 'workshop-details' | 'gaming' | 'quiz' | 'quiz-result' | 'culturai' | 'settings' | 'search' | 'filter' | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userName, setUserName] = useState('Sarah');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showError, setShowError] = useState(false);
  
  // Matchmaking state
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);
  const [showMatchOverlay, setShowMatchOverlay] = useState(false);
  const [showNoMatchOverlay, setShowNoMatchOverlay] = useState(false);
  const [chatProfile, setChatProfile] = useState<Profile | null>(null);

  // Quiz state
  const [currentQuiz, setCurrentQuiz] = useState<QuizData | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotalQuestions, setQuizTotalQuestions] = useState(0);
  const [quizEarnedPoints, setQuizEarnedPoints] = useState(0);
  const [userPoints, setUserPoints] = useState(2180);

  const handleWorkshopSelect = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setCurrentScreen('workshop-details');
  };

  const handleWorkshopRegister = () => {
    setShowConfirmation(true);
  };

  const handleShowError = () => {
    setShowError(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    setCurrentScreen('workshops');
  };

  const handleErrorClose = () => {
    setShowError(false);
  };

  // Matchmaking handlers
  const handleMatch = (profile: Profile) => {
    setMatchedProfile(profile);
    setShowMatchOverlay(true);
  };

  const handleNoMatch = () => {
    setShowNoMatchOverlay(true);
  };

  const handleStartChat = () => {
    if (matchedProfile) {
      setChatProfile(matchedProfile);
      setShowMatchOverlay(false);
      setCurrentScreen('match-chat');
    }
  };

  const handleContinueMatching = () => {
    setShowMatchOverlay(false);
    setMatchedProfile(null);
  };

  const handleNoMatchContinue = () => {
    setShowNoMatchOverlay(false);
  };

  const handleBackToMatchmaking = () => {
    setChatProfile(null);
    setCurrentScreen('matchmaking');
  };

  // Quiz handlers
  const handleQuizStart = (quizId: string) => {
    const quiz = getQuizById(quizId);
    if (quiz) {
      setCurrentQuiz(quiz);
      setCurrentScreen('quiz');
    }
  };

  const handleQuizComplete = (score: number, totalQuestions: number, earnedPoints: number) => {
    setQuizScore(score);
    setQuizTotalQuestions(totalQuestions);
    setQuizEarnedPoints(earnedPoints);
    setUserPoints(userPoints + earnedPoints);
    setCurrentScreen('quiz-result');
  };

  const handleRetakeQuiz = () => {
    setCurrentScreen('quiz');
  };

  const handleBackToGaming = () => {
    setCurrentScreen('gaming');
    toast.success('Punkte hinzugefügt!', {
      description: `+${quizEarnedPoints} Punkte`,
    });
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={() => setCurrentScreen('country')} onRegister={() => setCurrentScreen('registration')} />;
      case 'registration':
        return <RegistrationScreen onBack={() => setCurrentScreen('login')} onRegister={() => setCurrentScreen('country')} />;
      case 'country':
        return <CountrySelectionScreen onContinue={(country) => {
          setSelectedCountry(country);
          setCurrentScreen('dashboard');
        }} />;
      case 'dashboard':
        return <DashboardScreen userName={userName} onNavigate={setCurrentScreen} />;
      case 'chat':
        return <ChatListScreen onNavigate={setCurrentScreen} />;
      case 'matchmaking':
        return (
          <>
            <MatchmakingScreen 
              onNavigate={setCurrentScreen} 
              onMatch={handleMatch}
              onNoMatch={handleNoMatch}
            />
            {showMatchOverlay && matchedProfile && (
              <MatchOverlay
                profile={matchedProfile}
                onChat={handleStartChat}
                onContinue={handleContinueMatching}
              />
            )}
            {showNoMatchOverlay && (
              <NoMatchOverlay onContinue={handleNoMatchContinue} />
            )}
          </>
        );
      case 'match-chat':
        return chatProfile ? (
          <ChatScreen 
            profile={chatProfile}
            onNavigate={setCurrentScreen}
            onBack={handleBackToMatchmaking}
          />
        ) : <MatchmakingScreen onNavigate={setCurrentScreen} onMatch={handleMatch} onNoMatch={handleNoMatch} />;
      case 'social':
        return <SocialFeedScreen onNavigate={setCurrentScreen} />;
      case 'workshops':
        return <WorkshopsScreen onNavigate={setCurrentScreen} onWorkshopSelect={handleWorkshopSelect} />;
      case 'workshop-details':
        return selectedWorkshop ? (
          <WorkshopDetailsScreen 
            workshop={selectedWorkshop} 
            onNavigate={setCurrentScreen}
            onRegister={handleWorkshopRegister}
            onShowError={handleShowError}
          />
        ) : <WorkshopsScreen onNavigate={setCurrentScreen} onWorkshopSelect={handleWorkshopSelect} />;
      case 'gaming':
        return <GamingScreen onNavigate={setCurrentScreen} onQuizStart={handleQuizStart} userPoints={userPoints} />;
      case 'quiz':
        return currentQuiz ? (
          <QuizScreen 
            quizId={currentQuiz.id}
            quizTitle={currentQuiz.title}
            quizIcon={currentQuiz.icon}
            questions={currentQuiz.questions}
            onNavigate={setCurrentScreen}
            onQuizComplete={handleQuizComplete}
          />
        ) : <GamingScreen onNavigate={setCurrentScreen} onQuizStart={handleQuizStart} userPoints={userPoints} />;
      case 'quiz-result':
        return currentQuiz ? (
          <QuizResultScreen 
            quizTitle={currentQuiz.title}
            quizIcon={currentQuiz.icon}
            score={quizScore}
            totalQuestions={quizTotalQuestions}
            earnedPoints={quizEarnedPoints}
            onNavigate={setCurrentScreen}
            onRetakeQuiz={handleRetakeQuiz}
            onBackToGaming={handleBackToGaming}
          />
        ) : <GamingScreen onNavigate={setCurrentScreen} onQuizStart={handleQuizStart} userPoints={userPoints} />;
      case 'culturai':
        return <CulturAIScreen onNavigate={setCurrentScreen} />;
      case 'settings':
        return <SettingsScreen onNavigate={setCurrentScreen} />;
      case 'profile':
        return <MyProfileScreen onNavigate={setCurrentScreen} />;
      case 'search':
        return <SearchScreen onNavigate={setCurrentScreen} />;
      case 'filter':
        // Placeholder screens - navigate back to dashboard for now
        return <DashboardScreen userName={userName} onNavigate={setCurrentScreen} />;
      default:
        return <LoginScreen onLogin={() => setCurrentScreen('country')} onRegister={() => setCurrentScreen('registration')} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3ED] flex items-center justify-center p-4">
      <div className="w-full max-w-[430px] h-[932px] bg-[#F7F3ED] overflow-hidden relative shadow-2xl rounded-[3rem]">
        {renderScreen()}
        <Toaster />

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-gray-800 mb-3">Anmeldung bestätigt</h2>
                <p className="text-gray-600 mb-6">
                  Du bist erfolgreich für den Workshop angemeldet.
                </p>
                <button
                  onClick={handleConfirmationClose}
                  className="w-full py-3 bg-[#3B827E] text-white rounded-xl hover:bg-[#2d6663] transition-colors"
                >
                  Zurück zu Workshops
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Modal */}
        {showError && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h2 className="text-gray-800 mb-3">Workshop ausgebucht</h2>
                <p className="text-gray-600 mb-6">
                  Leider sind keine Plätze mehr verfügbar.
                </p>
                <button
                  onClick={handleErrorClose}
                  className="w-full py-3 bg-[#3B827E] text-white rounded-xl hover:bg-[#2d6663] transition-colors"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}