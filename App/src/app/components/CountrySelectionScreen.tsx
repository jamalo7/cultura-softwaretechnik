import { useState } from 'react';
import { FlagIcon } from './FlagIcon';

interface CountrySelectionScreenProps {
  onContinue: (country: string) => void;
}

const countries = [
  { name: 'Deutschland', code: 'DE' },
  { name: 'Spanien', code: 'ES' },
  { name: 'Marokko', code: 'MA' },
  { name: 'Frankreich', code: 'FR' },
  { name: 'Italien', code: 'IT' },
  { name: 'Türkei', code: 'TR' },
  { name: 'Vereinigtes Königreich', code: 'GB' },
  { name: 'Niederlande', code: 'NL' },
  { name: 'Schweiz', code: 'CH' },
  { name: 'Österreich', code: 'AT' },
  { name: 'Portugal', code: 'PT' },
  { name: 'Belgien', code: 'BE' },
  { name: 'Schweden', code: 'SE' },
  { name: 'Norwegen', code: 'NO' },
  { name: 'Dänemark', code: 'DK' },
  { name: 'Polen', code: 'PL' },
  { name: 'Griechenland', code: 'GR' },
  { name: 'USA', code: 'US' },
  { name: 'Kanada', code: 'CA' },
];

export function CountrySelectionScreen({ onContinue }: CountrySelectionScreenProps) {
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleContinue = () => {
    if (selectedCountry) {
      onContinue(selectedCountry);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-8 py-8 bg-white border-b border-gray-200">
        <h2 className="text-[#3B827E] text-center">Wähle dein Land</h2>
        <p className="text-gray-600 text-center text-sm mt-2">
          Wähle das Land aus, mit dem du dich verbinden möchtest
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-3">
        {countries.map((country) => (
          <button
            key={country.name}
            onClick={() => setSelectedCountry(country.name)}
            className={`w-full px-6 py-5 rounded-2xl transition-all text-left flex items-center gap-4 ${
              selectedCountry === country.name
                ? 'bg-[#3B827E] text-white shadow-lg scale-[1.02]'
                : 'bg-white text-gray-800 hover:shadow-md'
            }`}
          >
            <FlagIcon code={country.code} className="w-6 h-4 flex-shrink-0" />
            <span className="">{country.name}</span>
          </button>
        ))}
      </div>

      <div className="px-8 py-6 bg-white border-t border-gray-200">
        <button
          onClick={handleContinue}
          disabled={!selectedCountry}
          className={`w-full py-4 rounded-2xl transition-colors ${
            selectedCountry
              ? 'bg-[#3B827E] text-white hover:bg-[#2d6663]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Weiter
        </button>
      </div>
    </div>
  );
}