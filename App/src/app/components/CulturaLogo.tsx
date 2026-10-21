export function CulturaLogo({ size = 120 }: { size?: number }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="50" fill="#3B827E" opacity="0.1" />
        <circle cx="60" cy="60" r="45" stroke="#3B827E" strokeWidth="2.5" fill="none" />
        
        {/* Latitude lines */}
        <ellipse cx="60" cy="60" rx="45" ry="15" stroke="#3B827E" strokeWidth="1.5" fill="none" opacity="0.6" />
        <ellipse cx="60" cy="60" rx="45" ry="30" stroke="#3B827E" strokeWidth="1.5" fill="none" opacity="0.4" />
        
        {/* Longitude lines */}
        <ellipse cx="60" cy="60" rx="15" ry="45" stroke="#3B827E" strokeWidth="1.5" fill="none" opacity="0.6" />
        <ellipse cx="60" cy="60" rx="30" ry="45" stroke="#3B827E" strokeWidth="1.5" fill="none" opacity="0.4" />
        
        {/* Center dot */}
        <circle cx="60" cy="60" r="4" fill="#3B827E" />
      </svg>
      <div className="text-center">
        <h1 className="text-[#3B827E] tracking-wide">Cultura</h1>
        <p className="text-[#3B827E] opacity-70 text-sm mt-1">Connect. Learn. Grow.</p>
      </div>
    </div>
  );
}
