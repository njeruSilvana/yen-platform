import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition ${className}`}
    >
      {children}
    </div>
  );
}