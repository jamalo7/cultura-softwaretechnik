import { ArrowLeft, Send, Sparkles, Volume2, Copy } from 'lucide-react';
import { useState } from 'react';
import { BottomNav } from './BottomNav';
import type { Screen } from '../App';

interface CulturAIScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'other';
  text: string;
  translatedText?: string;
  timestamp: string;
  language: string;
}

const initialMessages: Message[] = [
  {
    id: '1',
    sender: 'other',
    text: '¡Hola! ¿Cómo estás hoy?',
    translatedText: 'Hallo! Wie geht es dir heute?',
    timestamp: '14:32',
    language: 'es',
  },
  {
    id: '2',
    sender: 'user',
    text: 'Mir geht es gut, danke! Ich lerne gerade Spanisch.',
    translatedText: 'Estoy bien, ¡gracias! Estoy aprendiendo español.',
    timestamp: '14:33',
    language: 'de',
  },
  {
    id: '3',
    sender: 'other',
    text: '¡Qué bien! El español es un idioma hermoso. ¿Qué te interesa más de la cultura española?',
    translatedText: 'Wie schön! Spanisch ist eine wunderschöne Sprache. Was interessiert dich am meisten an der spanischen Kultur?',
    timestamp: '14:34',
    language: 'es',
  },
  {
    id: '4',
    sender: 'user',
    text: 'Ich liebe die spanische Küche, besonders Tapas!',
    translatedText: 'Me encanta la cocina española, ¡especialmente las tapas!',
    timestamp: '14:35',
    language: 'de',
  },
];

export function CulturAIScreen({ onNavigate }: CulturAIScreenProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [aiTranslationEnabled, setAiTranslationEnabled] = useState(true);
  const [showTranslations, setShowTranslations] = useState(true);

  const chatPartner = {
    name: 'Carlos Rivera',
    language: 'Spanisch',
    avatar: 'https://i.pravatar.cc/150?img=8',
    status: 'online',
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      translatedText: aiTranslationEnabled ? '[AI-Übersetzung würde hier erscheinen]' : undefined,
      timestamp: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
      language: 'de',
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4 mb-3">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="text-gray-800 hover:text-[#3B827E] transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <img 
            src={chatPartner.avatar} 
            alt={chatPartner.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <h2 className="text-gray-800">{chatPartner.name}</h2>
            <p className="text-xs text-gray-500">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              {chatPartner.status} • {chatPartner.language}
            </p>
          </div>
        </div>

        {/* AI Translation Toggle */}
        <div className="bg-gradient-to-r from-[#3B827E]/10 to-[#3B827E]/5 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[#3B827E]" />
              <span className="text-sm text-gray-800">KI-Übersetzung</span>
            </div>
            <button
              onClick={() => {
                setAiTranslationEnabled(!aiTranslationEnabled);
                if (!aiTranslationEnabled) setShowTranslations(true);
              }}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                aiTranslationEnabled ? 'bg-[#3B827E]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  aiTranslationEnabled ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          {aiTranslationEnabled && (
            <button
              onClick={() => setShowTranslations(!showTranslations)}
              className="mt-2 text-xs text-[#3B827E] hover:underline"
            >
              {showTranslations ? 'Übersetzungen ausblenden' : 'Übersetzungen anzeigen'}
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 pb-24 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[75%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
              {/* Original Message */}
              <div
                className={`rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-[#3B827E] text-white rounded-br-sm'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
              </div>

              {/* AI Translation */}
              {aiTranslationEnabled && showTranslations && message.translatedText && (
                <div className="mt-2 bg-white/50 backdrop-blur-sm rounded-xl px-3 py-2 border border-gray-200">
                  <div className="flex items-start gap-2">
                    <Sparkles size={14} className="text-[#3B827E] mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 mb-1">KI-Übersetzung:</p>
                      <p className="text-sm text-gray-700">{message.translatedText}</p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button 
                        className="text-gray-400 hover:text-[#3B827E] transition-colors"
                        title="Vorlesen"
                      >
                        <Volume2 size={14} />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-[#3B827E] transition-colors"
                        title="Kopieren"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* AI Helper Message */}
        {aiTranslationEnabled && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#3B827E] to-[#2d6663] rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 mb-1">
                  <span>CulturAI Tipp</span>
                </p>
                <p className="text-xs text-gray-600">
                  "¿Cómo estás?" ist eine häufige spanische Begrüßung. Du kannst auch "¿Qué tal?" (Wie geht's?) verwenden!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3 mb-16">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
              aiTranslationEnabled
                ? 'Schreibe auf Deutsch, wird automatisch übersetzt...'
                : 'Nachricht eingeben...'
            }
            className="flex-1 px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3B827E] text-gray-800"
          />
          <button
            onClick={handleSend}
            className="w-12 h-12 bg-[#3B827E] text-white rounded-2xl flex items-center justify-center hover:bg-[#2d6663] transition-colors flex-shrink-0"
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      <BottomNav currentScreen="dashboard" onNavigate={onNavigate} />
    </div>
  );
}
