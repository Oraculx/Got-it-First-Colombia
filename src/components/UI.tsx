import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CharacterProps {
  type: 'happy' | 'studious' | 'sick' | 'lazy' | 'sad' | 'cool' | 'love';
  className?: string;
}

export const Character: React.FC<CharacterProps> = ({ type, className = "" }) => {
  // Simple SVG characters representing emotions
  const colors = {
    happy: '#3b82f6',
    studious: '#10b981',
    sick: '#94a3b8',
    lazy: '#f59e0b',
    sad: '#ef4444',
    cool: '#6366f1',
    love: '#ec4899'
  };

  const color = colors[type] || colors.happy;

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="28" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="2" />
        {/* Eyes */}
        <circle cx="22" cy="25" r="2" fill={color} />
        <circle cx="38" cy="25" r="2" fill={color} />
        
        {/* Mouths based on type */}
        {type === 'happy' && <path d="M22 38C22 38 25 42 30 42C35 42 38 38 38 38" stroke={color} strokeWidth="2" strokeLinecap="round" />}
        {type === 'studious' && <rect x="20" y="38" width="20" height="2" rx="1" fill={color} />}
        {type === 'sick' && <path d="M25 40L35 40" stroke={color} strokeWidth="2" strokeLinecap="round" />}
        {type === 'lazy' && <path d="M22 35C22 35 25 38 30 38C35 38 38 35 38 35" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />}
        {type === 'sad' && <path d="M22 42C22 42 25 38 30 38C35 38 38 42 38 42" stroke={color} strokeWidth="2" strokeLinecap="round" />}
        {type === 'cool' && <path d="M18 24H26M34 24H42" stroke={color} strokeWidth="3" strokeLinecap="round" />}
        {type === 'love' && <path d="M22 38C22 38 25 44 30 44C35 44 38 38 38 38" stroke={color} strokeWidth="2" strokeLinecap="round" />}
      </svg>
    </div>
  );
};

interface MenuButtonProps {
  title: string;
  icon: LucideIcon;
  colorClass: string;
  onClick: () => void;
  characterType?: 'happy' | 'studious' | 'sick' | 'lazy' | 'sad' | 'cool' | 'love';
}

export const MenuButton: React.FC<MenuButtonProps> = ({ title, icon: Icon, colorClass, onClick, characterType }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all active:scale-95 hover:shadow-lg text-white ${colorClass}`}
    >
      <div className="bg-white/20 p-3 rounded-xl">
        <Icon size={24} />
      </div>
      <span className="font-display font-bold text-lg flex-1 text-left">{title}</span>
      {characterType && <Character type={characterType} className="scale-75" />}
    </button>
  );
};

export const SubMenuButton: React.FC<{ title: string; onClick: () => void; active?: boolean; colorClass?: string }> = ({ title, onClick, active, colorClass = "bg-white" }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl text-left font-medium transition-all active:scale-[0.98] border ${
        active 
          ? 'border-slate-900 bg-slate-900 text-white shadow-md' 
          : `border-slate-200 ${colorClass} text-slate-700 hover:border-slate-300`
      }`}
    >
      {title}
    </button>
  );
};
