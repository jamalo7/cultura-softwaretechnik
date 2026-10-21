import { Heart, MessageCircle, Share2, MapPin } from 'lucide-react';
import { BottomNav } from './BottomNav';
import type { Screen } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SocialFeedScreenProps {
  onNavigate: (screen: Screen) => void;
}

const posts = [
  {
    id: 1,
    user: 'Jacob_23',
    avatar: '👨🏾',
    location: 'Marrakech, Marokko',
    image: 'https://images.unsplash.com/photo-1740381970014-3c3b0e79ca96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJyYWtlY2glMjBtb3JvY2NvJTIwY2l0eXxlbnwxfHx8fDE3NjQ1NzczNTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Unglaubliche Erfahrung auf dem Jemaa el-Fna! Die Kultur hier ist einfach atemberaubend. 🌟',
    likes: 234,
    comments: 18,
    time: '2 Stunden',
  },
  {
    id: 2,
    user: 'Sarah_K',
    avatar: '👩🏻',
    location: 'Barcelona, Spanien',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1080',
    caption: 'Tapas-Abend mit meinen neuen Freunden aus Cultura! 🍷',
    likes: 189,
    comments: 12,
    time: '5 Stunden',
  },
  {
    id: 3,
    user: 'Kemal_Berlin',
    avatar: '👨🏻',
    location: 'Berlin, Deutschland',
    image: 'https://images.unsplash.com/photo-1560930950-5cc20e80e392?w=1080',
    caption: 'Workshop über deutsche Traditionen war ein voller Erfolg! Danke an alle Teilnehmer 🎉',
    likes: 156,
    comments: 24,
    time: '1 Tag',
  },
];

export function SocialFeedScreen({ onNavigate }: SocialFeedScreenProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-6 bg-white border-b border-gray-200">
        <h2 className="text-[#3B827E]">Erlebnisse</h2>
        <p className="text-gray-600 text-sm mt-1">
          Entdecke kulturelle Momente
        </p>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto pb-24">
        {posts.map((post) => (
          <div key={post.id} className="bg-white mb-4 border-b-8 border-[#F7F3ED]">
            {/* Post Header */}
            <div className="px-6 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B827E] to-[#63B36D] flex items-center justify-center text-xl">
                {post.avatar}
              </div>
              <div className="flex-1">
                <p className="text-gray-800">{post.user}</p>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <MapPin size={12} />
                  <span>{post.location}</span>
                </div>
              </div>
              <span className="text-sm text-gray-400">{post.time}</span>
            </div>

            {/* Post Image */}
            <ImageWithFallback
              src={post.image}
              alt={post.location}
              className="w-full h-80 object-cover"
            />

            {/* Post Actions */}
            <div className="px-6 py-4">
              <div className="flex items-center gap-6 mb-3">
                <button className="flex items-center gap-2 text-gray-700 hover:text-[#E76844] transition-colors">
                  <Heart size={24} />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-700 hover:text-[#3B827E] transition-colors">
                  <MessageCircle size={24} />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-700 hover:text-[#3B827E] transition-colors ml-auto">
                  <Share2 size={24} />
                </button>
              </div>

              {/* Caption */}
              <p className="text-gray-800">
                <span className="">{post.user}</span>{' '}
                <span className="text-gray-700">{post.caption}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <BottomNav currentScreen="social" onNavigate={onNavigate} />
    </div>
  );
}
