import { 
  ChevronRight, 
  User, 
  Lock, 
  Mail, 
  Globe, 
  Moon, 
  Bell, 
  Shield, 
  UserX, 
  Database, 
  HelpCircle, 
  MessageCircle, 
  AlertCircle, 
  Info, 
  FileText, 
  LogOut,
  ArrowLeft
} from 'lucide-react';
import { BottomNav } from './BottomNav';
import type { Screen } from '../App';

interface SettingsScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface SettingsItem {
  id: string;
  label: string;
  icon: any;
  onClick?: () => void;
}

interface SettingsSection {
  title: string;
  items: SettingsItem[];
}

export function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const sections: SettingsSection[] = [
    {
      title: 'Account',
      items: [
        { id: 'edit-profile', label: 'Edit Profile', icon: User },
        { id: 'change-password', label: 'Change Password', icon: Lock },
        { id: 'email-security', label: 'Email & Security', icon: Mail },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { id: 'language', label: 'Language selection', icon: Globe },
        { id: 'theme', label: 'Theme (Light / Dark mode)', icon: Moon },
        { id: 'notifications', label: 'Notifications', icon: Bell },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        { id: 'privacy', label: 'Privacy settings', icon: Shield },
        { id: 'blocked', label: 'Blocked users', icon: UserX },
        { id: 'data', label: 'Data & permissions', icon: Database },
      ],
    },
    {
      title: 'Support',
      items: [
        { id: 'help', label: 'Help & FAQ', icon: HelpCircle },
        { id: 'contact', label: 'Contact support', icon: MessageCircle },
        { id: 'report', label: 'Report a problem', icon: AlertCircle },
      ],
    },
    {
      title: 'About',
      items: [
        { id: 'version', label: 'App version', icon: Info },
        { id: 'terms', label: 'Terms & Conditions', icon: FileText },
        { id: 'privacy-policy', label: 'Privacy Policy', icon: FileText },
      ],
    },
  ];

  return (
    <div className="h-full flex flex-col bg-[#F7F3ED]">
      {/* Header */}
      <div className="px-6 py-6 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-gray-800">Settings</h1>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="px-6 py-6 space-y-6">
          {sections.map((section) => (
            <div key={section.title} className="space-y-2">
              {/* Section Title */}
              <h3 className="text-gray-500 text-xs uppercase tracking-wider px-2 mb-3">
                {section.title}
              </h3>

              {/* Section Items */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                {section.items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.onClick}
                      className={`w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors ${
                        index !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                          <Icon size={18} className="text-gray-600" />
                        </div>
                        <span className="text-gray-800">{item.label}</span>
                      </div>
                      {item.id === 'version' ? (
                        <span className="text-gray-400 text-sm">1.0.0</span>
                      ) : (
                        <ChevronRight size={20} className="text-gray-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Logout Button */}
          <div className="pt-4">
            <button
              onClick={() => onNavigate('login')}
              className="w-full bg-white rounded-2xl px-4 py-4 flex items-center justify-center gap-3 hover:bg-red-50 transition-colors shadow-sm border border-gray-100 group"
            >
              <LogOut size={20} className="text-red-500" />
              <span className="text-red-500">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <BottomNav currentScreen="settings" onNavigate={onNavigate} />
    </div>
  );
}
