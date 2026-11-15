import React, { useState } from 'react';

interface NationalEmblemProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'gold' | 'white' | 'slate' | 'brass' | 'monochrome';
  showMotto?: boolean;
}

const PRIMARY_EMBLEM_URL = 'https://www.shutterstock.com/image-vector/indian-national-emblem-ashokas-lion-600nw-2534959015.jpg';
const FALLBACK_LOCAL_URL = '/images/indian-national-emblem.jpg';

export const NationalEmblem: React.FC<NationalEmblemProps> = ({
  className = '',
  size = 'md',
  variant = 'gold',
  showMotto = true,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(PRIMARY_EMBLEM_URL);
  const [hasError, setHasError] = useState(false);

  const sizeMap: Record<string, string> = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8 sm:w-9 sm:h-9',
    md: 'w-11 h-11 sm:w-12 sm:h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    '2xl': 'w-28 h-28',
  };

  const handleImgError = () => {
    if (imgSrc === PRIMARY_EMBLEM_URL) {
      // Fallback to locally cached copy
      setImgSrc(FALLBACK_LOCAL_URL);
    } else {
      // If even local copy fails, show SVG fallback
      setHasError(true);
    }
  };

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 select-none overflow-hidden rounded-xl bg-white/95 border border-amber-500/30 shadow-sm p-0.5 transition-all ${sizeMap[size] || 'w-10 h-10'} ${className}`}
      title="State Emblem of India (भारत का राष्ट्रीय प्रतीक) - Lion Capital of Ashoka with Satyameva Jayate"
      role="img"
      aria-label="State Emblem of India"
    >
      {!hasError ? (
        <img
          src={imgSrc}
          alt="State Emblem of India - Ashoka Lion Capital (सत्यमेव जयते)"
          className="w-full h-full object-contain rounded-lg"
          onError={handleImgError}
          loading="eager"
        />
      ) : (
        /* Vector SVG Fallback in case of network or loading issues */
        <svg
          viewBox="0 0 200 240"
          className="w-full h-full block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M85 24 C85 14, 115 14, 115 24 C120 28, 122 36, 118 44 C115 50, 110 54, 100 55 C90 54, 85 50, 82 44 C78 36, 80 28, 85 24 Z"
            fill="#d4af37"
          />
          <path
            d="M78 38 C70 42, 68 55, 75 68 C80 76, 90 82, 100 84 C110 82, 120 76, 125 68 C132 55, 130 42, 122 38 Z"
            fill="#c59b27"
          />
          <rect x="36" y="128" width="128" height="6" rx="2" fill="#d4af37" />
          <rect x="34" y="134" width="132" height="34" rx="3" fill="#996515" />
          <circle cx="100" cy="151" r="12" fill="#000080" />
          <circle cx="100" cy="151" r="3" fill="#ffffff" />
          <rect x="36" y="168" width="128" height="5" rx="1.5" fill="#d4af37" />
          <path
            d="M48 173 C60 178, 80 188, 100 188 C120 188, 140 178, 152 173 C144 192, 125 198, 100 198 C75 198, 56 192, 48 173 Z"
            fill="#c59b27"
          />
          <text
            x="100"
            y="218"
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="#996515"
          >
            सत्यमेव जयते
          </text>
        </svg>
      )}
    </div>
  );
};
