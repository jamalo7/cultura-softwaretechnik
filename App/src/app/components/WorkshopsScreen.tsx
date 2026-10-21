import { ArrowLeft, Calendar, Clock, Users, MapPin } from 'lucide-react';
import { useState } from 'react';
import { BottomNav } from './BottomNav';
import type { Screen } from '../App';
import { toast } from 'sonner';

interface WorkshopsScreenProps {
  onNavigate: (screen: Screen) => void;
  onWorkshopSelect: (workshop: Workshop) => void;
}

interface Workshop {
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
}

const categories = [
  { id: 'all', label: 'Alle', color: 'bg-[#3B827E]' },
  { id: 'sprache', label: 'Sprache', color: 'bg-blue-500' },
  { id: 'kultur', label: 'Kultur', color: 'bg-purple-500' },
  { id: 'essen', label: 'Essen und kulinarische Küche', color: 'bg-orange-500' },
  { id: 'musik', label: 'Musik', color: 'bg-pink-500' },
  { id: 'sport', label: 'Sport', color: 'bg-green-500' },
];

const workshops: Workshop[] = [
  {
    id: '1',
    title: 'Spanische Konversation für Anfänger',
    instructor: 'Maria Rodriguez',
    category: 'sprache',
    date: '15. Dez 2025',
    time: '18:00 - 19:30',
    participants: 12,
    maxParticipants: 20,
    location: 'Online',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=250&fit=crop',
  },
  {
    id: '2',
    title: 'Marokkanische Küche: Tajine Meisterklasse',
    instructor: 'Ahmed Ben Ali',
    category: 'essen',
    date: '18. Dez 2025',
    time: '17:00 - 20:00',
    participants: 8,
    maxParticipants: 15,
    location: 'Berlin-Mitte',
    image: 'https://images.unsplash.com/photo-1616787700988-44c85b2ffcf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NhbiUyMHRhamluZSUyMGRpc2h8ZW58MXx8fHwxNzY2MDY5MzM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    title: 'Italienische Operngeschichte',
    instructor: 'Lucia Bianchi',
    category: 'kultur',
    date: '20. Dez 2025',
    time: '19:00 - 21:00',
    participants: 15,
    maxParticipants: 25,
    location: 'Online',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
  },
  {
    id: '4',
    title: 'Salsa & Bachata Tanzkurs',
    instructor: 'Carlos Santos',
    category: 'musik',
    date: '22. Dez 2025',
    time: '20:00 - 21:30',
    participants: 20,
    maxParticipants: 20,
    location: 'Hamburg-Altona',
    image: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400&h=250&fit=crop',
  },
  {
    id: '5',
    title: 'Fußball-Kulturen weltweit',
    instructor: 'Thomas Müller',
    category: 'sport',
    date: '25. Dez 2025',
    time: '16:00 - 18:00',
    participants: 10,
    maxParticipants: 30,
    location: 'München',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=250&fit=crop',
  },
  {
    id: '6',
    title: 'Französische Literatur & Philosophie',
    instructor: 'Sophie Dubois',
    category: 'kultur',
    date: '28. Dez 2025',
    time: '18:30 - 20:00',
    participants: 7,
    maxParticipants: 15,
    location: 'Online',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
  },
];

export function WorkshopsScreen({ onNavigate, onWorkshopSelect }: WorkshopsScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [registeredWorkshops, setRegisteredWorkshops] = useState<string[]>([]);
  const [workshopData, setWorkshopData] = useState(workshops);

  const filteredWorkshops = selectedCategory === 'all' 
    ? workshopData 
    : workshopData.filter(w => w.category === selectedCategory);

  const handleRegister = (workshopId: string, workshopTitle: string) => {
    setRegisteredWorkshops([...registeredWorkshops, workshopId]);
    setWorkshopData(workshopData.map(w => 
      w.id === workshopId ? { ...w, participants: w.participants + 1 } : w
    ));
    toast.success('Anmeldung erfolgreich!', {
      description: `Du bist jetzt für "${workshopTitle}" angemeldet.`
    });
  };

  const handleCancel = (workshopId: string, workshopTitle: string) => {
    setRegisteredWorkshops(registeredWorkshops.filter(id => id !== workshopId));
    setWorkshopData(workshopData.map(w => 
      w.id === workshopId ? { ...w, participants: w.participants - 1 } : w
    ));
    toast.success('Anmeldung storniert', {
      description: `Deine Anmeldung für "${workshopTitle}" wurde storniert.`
    });
  };

  const handleWaitlist = (workshopTitle: string) => {
    toast.success('Zur Warteliste hinzugefügt', {
      description: `Du wurdest zur Warteliste für "${workshopTitle}" hinzugefügt.`
    });
  };

  const isFullyBooked = (workshop: Workshop) => {
    return workshop.participants >= workshop.maxParticipants;
  };

  const isRegistered = (workshopId: string) => {
    return registeredWorkshops.includes(workshopId);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-6 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="text-gray-800 hover:text-[#3B827E] transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-gray-800">Workshops</h1>
            <p className="text-gray-600 text-sm mt-1">
              Entdecke kulturelle Veranstaltungen
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? `${category.color} text-white`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Workshop List */}
      <div className="flex-1 overflow-y-auto px-6 py-4 pb-24">
        <div className="space-y-4">
          {filteredWorkshops.map((workshop) => (
            <div
              key={workshop.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onWorkshopSelect(workshop)}
            >
              {/* Workshop Image */}
              <div className="h-40 overflow-hidden">
                <img
                  src={workshop.image}
                  alt={workshop.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Workshop Details */}
              <div className="p-5">
                <h3 className="text-gray-800 mb-2">{workshop.title}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  von {workshop.instructor}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} className="text-[#3B827E]" />
                    <span>{workshop.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} className="text-[#3B827E]" />
                    <span>{workshop.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} className="text-[#3B827E]" />
                    <span>{workshop.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users size={16} className="text-[#3B827E]" />
                    <span>
                      {workshop.participants}/{workshop.maxParticipants} Teilnehmer
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#3B827E] rounded-full"
                      style={{
                        width: `${(workshop.participants / workshop.maxParticipants) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                {isRegistered(workshop.id) ? (
                  <button
                    className="w-full py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                    onClick={() => handleCancel(workshop.id, workshop.title)}
                  >
                    Anmeldung stornieren
                  </button>
                ) : isFullyBooked(workshop) ? (
                  <>
                    <p className="text-sm text-gray-600 mb-3 text-center">
                      Dieser Workshop ist aktuell ausgebucht.
                    </p>
                    <button
                      className="w-full py-3 bg-[#3B827E] text-white rounded-xl hover:bg-[#2d6663] transition-colors"
                      onClick={() => handleWaitlist(workshop.title)}
                    >
                      Zur Warteliste hinzufügen
                    </button>
                  </>
                ) : (
                  <button
                    className="w-full py-3 bg-[#3B827E] text-white rounded-xl hover:bg-[#2d6663] transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onWorkshopSelect(workshop);
                    }}
                  >
                    Jetzt Anmelden
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav currentScreen="dashboard" onNavigate={onNavigate} />
    </div>
  );
}