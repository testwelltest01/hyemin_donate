import React from 'react';
import { Home, Users, User, ArrowLeft, Share2, Menu } from 'lucide-react';

export const AppHeader = ({ title, showBack, onBack }: { title: string; showBack?: boolean; onBack?: () => void }) => (
  <header className="absolute top-0 left-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-surface-container-high shadow-sm h-16">
    <div className="flex justify-between items-center px-5 h-full max-w-2xl mx-auto">
      {showBack ? (
        <button onClick={onBack} className="p-2 -ml-2 text-on-surface hover:opacity-70 transition-opacity">
          <ArrowLeft size={24} />
        </button>
      ) : (
        <button className="p-2 -ml-2 text-on-surface hover:opacity-70">
          <Menu size={24} />
        </button>
      )}
      
      <h1 className="font-bold text-lg tracking-tight text-primary-container">GoodLoop</h1>
      
      <button className="p-2 -mr-2 text-on-surface-variant hover:opacity-70">
        {showBack ? <Share2 size={20} /> : (
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary-container">
            <img src="https://i.pravatar.cc/150?u=me" alt="Me" className="w-full h-full object-cover" />
          </div>
        )}
      </button>
    </div>
  </header>
);

export const BottomNav = ({ activeTab, onChange }: { activeTab: string; onChange: (tab: string) => void }) => (
  <nav className="absolute bottom-0 left-0 w-full z-50 bg-white/90 backdrop-blur-xl border-t border-surface-container-high rounded-t-xl shadow-warm px-4 pb-8 pt-3">
    <div className="flex justify-around items-center max-w-2xl mx-auto">
      <NavButton 
        active={activeTab === 'home'} 
        onClick={() => onChange('home')} 
        icon={<Home size={22} />} 
        label="Home" 
      />
      <NavButton 
        active={activeTab === 'feed'} 
        onClick={() => onChange('feed')} 
        icon={<Users size={22} />} 
        label="Feed" 
      />
      <NavButton 
        active={activeTab === 'profile'} 
        onClick={() => onChange('profile')} 
        icon={<User size={22} />} 
        label="My Page" 
      />
    </div>
  </nav>
);

const NavButton = ({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-2 transition-all duration-200 ${
      active ? 'text-primary-container bg-primary-container/10 rounded-2xl px-6' : 'text-on-surface-variant'
    }`}
  >
    {icon}
    <span className="text-[11px] font-semibold mt-1">{label}</span>
  </button>
);
