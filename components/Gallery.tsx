import React from 'react';
import type { StoredImage } from '../types';

interface GalleryProps {
  images: StoredImage[];
  isLoading: boolean;
}

const GallerySkeleton: React.FC = () => (
  <div className="flex space-x-4 overflow-x-hidden pb-2">
    {Array.from({ length: 5 }).map((_, index) => (
      <div
        key={index}
        className="flex-shrink-0 w-48 h-48 rounded-lg bg-slate-700/50 animate-pulse"
      />
    ))}
  </div>
);


const Gallery: React.FC<GalleryProps> = ({ images, isLoading }) => {
  if (isLoading) {
     return (
        <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Ghost Gallery
            </h2>
            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 shadow-lg backdrop-blur-sm">
                <GallerySkeleton />
            </div>
        </div>
     );
  }

  if (images.length === 0) {
    return null;
  }
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
        Ghost Gallery
      </h2>
      <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 shadow-lg backdrop-blur-sm">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <div 
              key={image.id} 
              className="relative group flex-shrink-0 w-48 h-48 rounded-lg overflow-hidden border-2 border-slate-700 hover:border-cyan-400 transition-colors duration-300 animate-fade-in-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={image.url}
                alt={`Generated ghost from ${new Date(image.timestamp).toLocaleString()}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                 <time className="text-white text-xs font-mono" dateTime={new Date(image.timestamp).toISOString()}>
                    {formatDate(image.timestamp)}
                  </time>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;