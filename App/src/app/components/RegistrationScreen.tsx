import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface RegistrationScreenProps {
  onBack: () => void;
  onRegister: () => void;
}

export function RegistrationScreen({ onBack, onRegister }: RegistrationScreenProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    birthdate: '',
    country: '',
    phone: '',
    email: '',
    password: '',
    dataConsent: false,
    privacyPolicy: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.dataConsent && formData.privacyPolicy) {
      onRegister();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-6 flex items-center gap-4 bg-white border-b border-gray-200">
        <button onClick={onBack} className="text-[#3B827E]">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-[#3B827E]">Registrierung</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Vollständiger Name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3B827E] text-gray-800"
              required
            />
          </div>

          <div>
            <input
              type="date"
              placeholder="Geburtsdatum"
              value={formData.birthdate}
              onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
              className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3B827E] text-gray-800"
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Land"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3B827E] text-gray-800"
              required
            />
          </div>

          <div>
            <input
              type="tel"
              placeholder="Telefonnummer"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3B827E] text-gray-800"
              required
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="E-Mail"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3B827E] text-gray-800"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Passwort"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3B827E] text-gray-800"
              required
            />
          </div>

          <div className="space-y-3 pt-4">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={formData.dataConsent}
                onChange={(e) => setFormData({ ...formData, dataConsent: e.target.checked })}
                className="mt-1 w-5 h-5 text-[#3B827E] border-gray-300 rounded focus:ring-[#3B827E]"
                required
              />
              <span className="text-sm text-gray-700">
                Ich stimme der Verarbeitung meiner Daten zu
              </span>
            </label>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={formData.privacyPolicy}
                onChange={(e) => setFormData({ ...formData, privacyPolicy: e.target.checked })}
                className="mt-1 w-5 h-5 text-[#3B827E] border-gray-300 rounded focus:ring-[#3B827E]"
                required
              />
              <span className="text-sm text-gray-700">
                Ich akzeptiere die Datenschutzbestimmungen
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#3B827E] text-white rounded-2xl hover:bg-[#2d6663] transition-colors mt-6"
          >
            Registrieren
          </button>
        </form>
      </div>
    </div>
  );
}
