import React, { useState } from 'react';
import { Building2, Zap } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  variant?: 'power' | 'construction';
  loading?: 'eager' | 'lazy';
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle,
  variant = 'power',
  loading = 'lazy',
}) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#0B1F3A] via-[#0E3A2D] to-[#132C4E] text-white"
      >
        <div className="w-12 h-12 rounded-xl border border-white/20 bg-white/10 flex items-center justify-center mb-3">
          {variant === 'power' ? (
            <Zap className="w-6 h-6 text-[#C49334]" />
          ) : (
            <Building2 className="w-6 h-6 text-[#C49334]" />
          )}
        </div>
        <span className="text-xs font-medium tracking-wide text-white/85 max-w-[18rem] leading-relaxed">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
