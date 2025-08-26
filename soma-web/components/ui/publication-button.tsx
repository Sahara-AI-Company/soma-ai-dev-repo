import React from 'react';
import { Button } from './button';
import Image from 'next/image';
import { Publication } from '@/redux/user-store/userPublicationsSlice';

interface PublicationButtonProps {
  publication: Publication;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function PublicationButton({
  publication,
  onClick,
  className = '',
  variant = 'outline',
  size = 'md'
}: PublicationButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  };

  const imageSize = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  return (
    <Button
      variant={variant}
      onClick={onClick}
      className={`flex flex-row items-center gap-3  ${sizeClasses[size]} ${className}`}
    >
      <div className={`relative ${imageSize[size]} rounded-full overflow-hidden bg-accent flex-shrink-0`}>
        {publication.publication_picture ? (
          <Image
            src={publication.publication_picture}
            alt={publication.publication_name || publication.publication_username}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-blue-500 font-bold">
            {(publication.publication_name || publication.publication_username)?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <span className="font-medium truncate">
        {publication.publication_name || publication.publication_username}
      </span>
    </Button>
  );
}

// Multiple Publications Button Component
interface PublicationsButtonProps {
  publications: Publication[];
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  maxDisplay?: number;
}

export function PublicationsButton({
  publications,
  onClick,
  className = '',
  variant = 'outline',
  size = 'md',
  maxDisplay = 3
}: PublicationsButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  };

  const imageSize = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const displayedPublications = publications.slice(0, maxDisplay);
  const remainingCount = publications.length - maxDisplay;

  return (
    <div className={`flex flex-row items-center gap-2 ${className}`}>
      {displayedPublications.map((publication) => (
        <Button
          key={publication.id}
          variant={variant}
          onClick={onClick}
          className={`flex flex-row items-center gap-3 ${sizeClasses[size]}`}
        >
          <div className={`relative ${imageSize[size]} rounded-full overflow-hidden bg-accent flex-shrink-0`}>
            {publication.publication_picture ? (
              <Image
                src={publication.publication_picture}
                alt={publication.publication_name || publication.publication_username}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-blue-500 font-bold">
                {(publication.publication_name || publication.publication_username)?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <span className="font-medium truncate">
            {publication.publication_name || publication.publication_username}
          </span>
        </Button>
      ))}
      {remainingCount > 0 && (
        <Button
          variant={variant}
          onClick={onClick}
          className={`flex flex-row items-center gap-3 ${sizeClasses[size]}`}
        >
          <div className={`relative ${imageSize[size]} rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground flex-shrink-0`}>
            +{remainingCount}
          </div>
          <span className="font-medium">+{remainingCount}</span>
        </Button>
      )}
    </div>
  );
}
