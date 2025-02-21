import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import type { StarRatingProps } from '../types';

export default function StarRating({ value, maxValue = 5 }: StarRatingProps) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const emptyStars = Math.floor(maxValue - value);

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 text-yellow-400 fill-current" />
      ))}
      {hasHalfStar && <StarHalf className="w-5 h-5 text-yellow-400 fill-current" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      ))}
    </div>
  );
}