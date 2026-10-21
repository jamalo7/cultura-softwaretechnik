import { Search } from 'lucide-react';
import { BottomNav } from './BottomNav';
import type { Screen } from '../App';

interface ChatListScreenProps {
  onNavigate: (screen: Screen) => void;
}

const chats = [
  {
    id: 1,
    name: 'Ercan',
    message: 'Hey! Wie geht es dir?',
    time: '10:30',
    avatar: '👨🏻',
    unread: 1,
    online: true,
  },
  {
    id: 2,
    name: 'Melissa',
    message: 'Danke für den Workshop!',
    time: '09:15',
    avatar: '👩🏼',
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: 'Ahmed',
    message: 'Wann ist das nächste Treffen?',
    time: 'Gestern',
    avatar: '👨🏽',
    unread: 0,
    online: false,
  },
  {
    id: 4,
    name: 'Sophie',
    message: 'Ich habe die Fotos geschickt',
    time: 'Gestern',
    avatar: '👩🏻',
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: 'Carlos',
    message: '¡Perfecto! Hasta luego',
    time: '2 Tage',
    avatar: '👨🏾',
    unread: 0,
    online: false,
  },
  {
    id: 6,
    name: 'Yuki',
    message: 'ありがとう！',
    time: '3 Tage',
    avatar: '👩',
    unread: 0,
    online: false,
  },
];

export function ChatListScreen({ onNavigate }: ChatListScreenProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-6 bg-white border-b border-gray-200">
        <h2 className="text-[#3B827E] mb-4">Chats</h2>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Suche nach Kontakten..."
            className="w-full pl-12 pr-4 py-3 bg-[#F7F3ED] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3B827E] text-gray-800"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto pb-24">
        {chats.map((chat) => (
          <button
            key={chat.id}
            className="w-full px-6 py-4 flex items-center gap-4 hover:bg-white/50 transition-colors border-b border-gray-100"
          >
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#3B827E] to-[#63B36D] flex items-center justify-center text-2xl">
                {chat.avatar}
              </div>
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#63B36D] border-2 border-white rounded-full"></div>
              )}
            </div>

            <div className="flex-1 text-left">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-800">{chat.name}</span>
                <span className="text-sm text-gray-500">{chat.time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{chat.message}</p>
            </div>

            {chat.unread > 0 && (
              <div className="w-6 h-6 bg-[#E76844] rounded-full flex items-center justify-center">
                <span className="text-white text-xs">{chat.unread}</span>
              </div>
            )}
          </button>
        ))}
      </div>

      <BottomNav currentScreen="chat" onNavigate={onNavigate} />
    </div>
  );
}
