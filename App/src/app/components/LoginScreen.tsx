import { useState } from 'react';
import { CulturaLogo } from './CulturaLogo';

interface LoginScreenProps {
  onLogin: () => void;
  onRegister: () => void;
}

export function LoginScreen({ onLogin, onRegister }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="h-full flex flex-col items-center justify-center px-8">
      <div className="mb-12">
        <CulturaLogo size={100} />
      </div>

      <form onSubmit={handleLogin} className="w-full space-y-4">
        <div>
          <input
            type="email"
            placeholder="E-Mail oder Benutzername"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3B827E] text-gray-800"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3B827E] text-gray-800"
          />
        </div>

        <div className="text-right">
          <button type="button" className="text-[#3B827E] text-sm">
            Passwort vergessen?
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-[#3B827E] text-white rounded-2xl hover:bg-[#2d6663] transition-colors"
        >
          Anmelden
        </button>

        <div className="text-center mt-6">
          <span className="text-gray-600">Noch kein Konto? </span>
          <button
            type="button"
            onClick={onRegister}
            className="text-[#3B827E]"
          >
            Registrieren
          </button>
        </div>
      </form>
    </div>
  );
}
