interface FlagIconProps {
  code: string;
  className?: string;
}

export function FlagIcon({ code, className = '' }: FlagIconProps) {
  const flags: Record<string, JSX.Element> = {
    DE: (
      <svg className={className} viewBox="0 0 24 16" fill="none">
        <rect width="24" height="16" rx="2" fill="#000000"/>
        <rect width="24" height="10.67" y="5.33" rx="2" fill="#DD0000"/>
        <rect width="24" height="5.33" y="10.67" rx="2" fill="#FFCE00"/>
      </svg>
    ),
    ES: (
      <svg className={className} viewBox="0 0 24 16" fill="none">
        <rect width="24" height="16" rx="2" fill="#AA151B"/>
        <rect width="24" height="10" y="3" fill="#F1BF00"/>
      </svg>
    ),
    MA: (
      <svg className={className} viewBox="0 0 24 16" fill="none">
        <rect width="24" height="16" rx="2" fill="#C1272D"/>
        <path d="M12 4L13.236 8.382H17.854L14.309 10.927L15.545 15.309L12 12.764L8.455 15.309L9.691 10.927L6.146 8.382H10.764L12 4Z" fill="none" stroke="#006233" strokeWidth="0.8"/>
      </svg>
    ),
    FR: (
      <svg className={className} viewBox="0 0 24 16" fill="none">
        <rect width="24" height="16" rx="2" fill="#FFFFFF"/>
        <rect width="8" height="16" fill="#002395"/>
        <rect width="8" height="16" x="16" fill="#ED2939"/>
      </svg>
    ),
    IT: (
      <svg className={className} viewBox="0 0 24 16" fill="none">
        <rect width="24" height="16" rx="2" fill="#FFFFFF"/>
        <rect width="8" height="16" fill="#009246"/>
        <rect width="8" height="16" x="16" fill="#CE2B37"/>
      </svg>
    ),
    TR: (
      <svg className={className} viewBox="0 0 24 16" fill="none">
        <rect width="24" height="16" rx="2" fill="#E30A17"/>
        <circle cx="10" cy="8" r="3" fill="#FFFFFF"/>
        <circle cx="11" cy="8" r="2.4" fill="#E30A17"/>
        <path d="M14 5L15.5 7.5L18 7.5L16 9.5L17 12L14 10L11 12L12 9.5L10 7.5L12.5 7.5L14 5Z" fill="#FFFFFF"/>
      </svg>
    ),
    GB: (
      <svg className={className} viewBox="0 0 24 16" fill="none">
        <rect width="24" height="16" rx="2" fill="#012169"/>
        <path d="M0 0L24 16M24 0L0 16" stroke="#FFFFFF" strokeWidth="3.2"/>
        <path d="M0 0L24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.6"/>
        <path d="M12 0V16M0 8H24" stroke="#FFFFFF" strokeWidth="5.3"/>
        <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="3.2"/>
      </svg>
    ),
    NL: (
      <svg className={className} viewBox="0 0 24 16" fill="none">
        <rect width="24" height="16" rx="2" fill="#FFFFFF"/>
        <rect width="24" height="5.33" fill="#AE1C28"/>
        <rect width="24" height="5.33" y="10.67" fill="#21468B"/>
      </svg>
    ),
    CH: (
      <svg className={className} viewBox="0 0 24 16" fill="none">
        <rect width="24" height="16" rx="2" fill="#FF0000"/>
        <path d="M12 4V12M8 8H16" stroke="#FFFFFF" strokeWidth="2"/>
      </svg>
    ),
    AT: (
      <svg className={className} viewBox="0 0 24 16" fill="none">
        <rect width="24" height="16" rx="2" fill="#ED2939"/>
        <rect width="24" height="5.33" y="5.33" fill="#FFFFFF"/>
      </svg>
    ),
    PT: (
      <svg className={className} viewBox="0 0 24 16" fill="none">
        <rect width="24" height="16" rx="2" fill="#FF0000"/>
        <rect width="9.6" height="16" fill="#006600"/>
        <circle cx="9.6" cy="8" r="2.4" fill="#FFFF00" stroke="#000080" strokeWidth="0.4"/>
      </svg>
    ),
    BE: (
      <svg className={className} viewBox="0 0 24 16" fill="none">
        <rect width="24" height="16" rx="2" fill="#FFFFFF"/>
        <rect width="8" height="16" fill="#000000"/>
        <rect width="8" height="16" x="8" fill="#FDDA24"/>
        <rect width="8" height="16" x="16" fill="#EF3340"/>
      </svg>
    ),
    SE: (
      <svg className={className} viewBox="0 0 24 16" fill="none">
        <rect width="24" height="16" rx="2" fill="#006AA7"/>
        <path d="M8 0V16M0 8H24" stroke="#FECC00" strokeWidth="2.5"/>
      </svg>
    ),
    NO: (
      <svg className={className} viewBox="0 0 24 16" fill="none">
        <rect width="24" height="16" rx="2" fill="#BA0C2F"/>
        <path d="M8 0V16M0 8H24" stroke="#FFFFFF" strokeWidth="4"/>
        <path d="M8 0V16M0 8H24" stroke="#00205B" strokeWidth="2"/>
      </svg>
    ),
    DK: (
      <svg className={className} viewBox="0 0 24 16" fill="none">
        <rect width="24" height="16" rx="2" fill="#C8102E"/>
        <path d="M8 0V16M0 8H24" stroke="#FFFFFF" strokeWidth="2.5"/>
      </svg>
    ),
    PL: (
      <svg className={className} viewBox="0 0 24 16" fill="none">
        <rect width="24" height="16" rx="2" fill="#FFFFFF"/>
        <rect width="24" height="8" y="8" fill="#DC143C"/>
      </svg>
    ),
    GR: (
      <svg className={className} viewBox="0 0 24 16" fill="none">
        <rect width="24" height="16" rx="2" fill="#FFFFFF"/>
        <rect width="24" height="1.78" y="0" fill="#0D5EAF"/>
        <rect width="24" height="1.78" y="3.56" fill="#0D5EAF"/>
        <rect width="24" height="1.78" y="7.11" fill="#0D5EAF"/>
        <rect width="24" height="1.78" y="10.67" fill="#0D5EAF"/>
        <rect width="24" height="1.78" y="14.22" fill="#0D5EAF"/>
        <rect width="9.6" height="8.89" fill="#0D5EAF"/>
        <path d="M4.8 0V8.89M0 4.44H9.6" stroke="#FFFFFF" strokeWidth="1.5"/>
      </svg>
    ),
    US: (
      <svg className={className} viewBox="0 0 24 16" fill="none">
        <rect width="24" height="16" rx="2" fill="#FFFFFF"/>
        <rect width="24" height="1.23" y="0" fill="#B22234"/>
        <rect width="24" height="1.23" y="2.46" fill="#B22234"/>
        <rect width="24" height="1.23" y="4.92" fill="#B22234"/>
        <rect width="24" height="1.23" y="7.38" fill="#B22234"/>
        <rect width="24" height="1.23" y="9.85" fill="#B22234"/>
        <rect width="24" height="1.23" y="12.31" fill="#B22234"/>
        <rect width="24" height="1.23" y="14.77" fill="#B22234"/>
        <rect width="9.6" height="8.62" fill="#3C3B6E"/>
      </svg>
    ),
    CA: (
      <svg className={className} viewBox="0 0 24 16" fill="none">
        <rect width="24" height="16" rx="2" fill="#FFFFFF"/>
        <rect width="6" height="16" fill="#FF0000"/>
        <rect width="6" height="16" x="18" fill="#FF0000"/>
        <path d="M12 4L11 7H9L11 8.5L10 11L12 9.5L14 11L13 8.5L15 7H13L12 4Z" fill="#FF0000"/>
      </svg>
    ),
  };

  return flags[code] || null;
}
