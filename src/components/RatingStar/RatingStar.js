// src/components/StarRating.js
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './RatingStar.css';

const StarRating = ({ rating, onRate }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="RatingStar">
      {[...Array(5)].map((_, index) => {
        const value = index + 1;
        return (
          <FaStar
            key={index}
            size={20}
            color={value <= (hovered || rating) ? "#ffc107" : "#e4e5e9"}
            style={{ cursor: "pointer" }}
            onClick={() => onRate(value)}
            onMouseEnter={() => setHovered(value)}
            onMouseLeave={() => setHovered(null)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
