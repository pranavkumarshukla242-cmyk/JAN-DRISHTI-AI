import React from 'react';

interface NationalFlagProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  withBorder?: boolean;
  withShadow?: boolean;
  waving?: boolean;
}

export const NationalFlag: React.FC<NationalFlagProps> = ({
  className = '',
  size = 'md',
  withBorder = true,
  withShadow = true,
  waving = false,
}) => {
  const sizeMap = {
    xs: 'w-5 h-3.5',
    sm: 'w-7 h-4.5',
    md: 'w-9 h-6',
    lg: 'w-12 h-8',
    xl: 'w-16 h-10.5',
  };

  return (
    <div
      className={`inline-flex shrink-0 relative overflow-hidden rounded-[3px] select-none ${sizeMap[size]} ${
        withBorder ? 'border border-slate-300/40 dark:border-white/20' : ''
      } ${withShadow ? 'shadow-sm shadow-black/30' : ''} ${className}`}
      title="National Flag of India (Tiranga / तिरंगा)"
      role="img"
      aria-label="National Flag of India"
    >
      <svg
        viewBox="0 0 900 600"
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {waving && (
            <linearGradient id="flag-wave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
              <stop offset="25%" stopColor="#000000" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.2" />
              <stop offset="75%" stopColor="#000000" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
            </linearGradient>
          )}
        </defs>

        {/* Top Band: India Saffron (Kesari) */}
        <rect width="900" height="200" fill="#FF9933" />

        {/* Middle Band: White */}
        <rect y="200" width="900" height="200" fill="#FFFFFF" />

        {/* Bottom Band: India Green */}
        <rect y="400" width="900" height="200" fill="#138808" />

        {/* Ashoka Chakra in Center (Navy Blue, 24 Spokes) */}
        <g transform="translate(450, 300)">
          {/* Outer Ring */}
          <circle r="75" fill="none" stroke="#000080" strokeWidth="6.5" />
          
          {/* Inner Hub Ring */}
          <circle r="16" fill="#000080" />
          <circle r="6" fill="#FFFFFF" />

          {/* 24 Spokes */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            return (
              <g key={i} transform={`rotate(${angle})`}>
                {/* Spoke line */}
                <line
                  x1="0"
                  y1="-16"
                  x2="0"
                  y2="-73"
                  stroke="#000080"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
                {/* Spoke arrow tip diamond / dot */}
                <circle cx="0" cy="-68" r="2.2" fill="#000080" />
              </g>
            );
          })}
        </g>

        {/* Optional wave highlight */}
        {waving && <rect width="900" height="600" fill="url(#flag-wave)" />}
      </svg>
    </div>
  );
};
