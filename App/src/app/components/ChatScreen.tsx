import { ArrowLeft, Send } from 'lucide-react';
import { useState } from 'react';
import { BottomNav } from './BottomNav';
import type { Screen } from '../App';
import { Profile } from './MatchmakingScreen';

interface ChatScreenProps {
  profile: Profile;
  onNavigate: (screen: Screen) => void;
  onBack: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'other';
  time: string;
}

const mockMessages: Record<number, Message[]> = {
  1: [ // Alexander
    {
      id: 1,
      text: 'Hey! Schön, dass wir gematcht haben! 😊',
      sender: 'other',
      time: '14:23',
    },
    {
      id: 2,
      text: 'Hallo Alexander! Ja, ich habe gesehen, dass du auch gerne kochst!',
      sender: 'user',
      time: '14:25',
    },
    {
      id: 3,
      text: 'Genau! Ich liebe es, neue Rezepte auszuprobieren. Welche Küche magst du am liebsten?',
      sender: 'other',
      time: '14:26',
    },
    {
      id: 4,
      text: 'Ich stehe total auf italienische und spanische Küche. Hast du Empfehlungen?',
      sender: 'user',
      time: '14:28',
    },
    {
      id: 5,
      text: 'Oh ja! Ich kann dir ein tolles Rezept für Paella zeigen. Wollen wir mal zusammen kochen? 🍳',
      sender: 'other',
      time: '14:30',
    },
  ],
  2: [ // Sofia
    {
      id: 1,
      text: '¡Hola! Es ist so toll, jemanden aus Deutschland kennenzulernen!',
      sender: 'other',
      time: '15:10',
    },
    {
      id: 2,
      text: 'Hola Sofia! Dein Profil hat mich sofort angesprochen. Tanzen ist eine Leidenschaft von mir!',
      sender: 'user',
      time: '15:12',
    },
    {
      id: 3,
      text: 'Wirklich? Ich tanze seit 10 Jahren Salsa und Bachata! Tanzt du auch?',
      sender: 'other',
      time: '15:13',
    },
    {
      id: 4,
      text: 'Ich bin noch Anfänger, aber ich liebe es! Vielleicht kannst du mir ein paar Moves beibringen? 💃',
      sender: 'user',
      time: '15:15',
    },
    {
      id: 5,
      text: 'Aber natürlich! Wann kommst du nach Madrid? Oder sollen wir ein Video-Tutorial machen? 😄',
      sender: 'other',
      time: '15:17',
    },
  ],
};

export function ChatScreen({ profile, onNavigate, onBack }: ChatScreenProps) {
  const [messageText, setMessageText] = useState('');
  const messages = mockMessages[profile.id] || [];

  const handleSend = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message
      setMessageText('');
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#F7F3ED]">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="text-gray-800 hover:text-[#3B827E] transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          {/* Profile Info */}
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#3B827E]">
              <img 
                src={profile.photo} 
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-gray-800">{profile.name}</h3>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 pb-28">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                message.sender === 'user'
                  ? 'bg-[#3B827E] text-white rounded-br-sm'
                  : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                }`}
              >
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="fixed bottom-20 left-0 right-0 px-6 py-4 bg-white border-t border-gray-200">
        <div className="max-w-[430px] mx-auto flex items-center gap-3">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Nachricht schreiben..."
            className="flex-1 px-4 py-3 bg-[#F7F3ED] border-none rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B827E]"
          />
          <button
            onClick={handleSend}
            disabled={!messageText.trim()}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              messageText.trim()
                ? 'bg-[#3B827E] text-white hover:bg-[#2d6663] active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      <BottomNav currentScreen="chat" onNavigate={onNavigate} />
    </div>
  );
}
