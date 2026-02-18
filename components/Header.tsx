
import React from 'react';
import { LOGO_ICON_SVG } from '../constants';

interface HeaderProps {
  view: 'FORM' | 'PREVIEW' | 'HISTORY';
  onBack: () => void;
  onHistoryClick: () => void;
  onNewClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ view, onBack, onHistoryClick, onNewClick }) => {
  const isForm = view === 'FORM';

  return (
    <header className="sticky top-0 z-50 bg-white text-black px-4 py-3 shadow-sm border-b flex items-center justify-between h-16">
      <div className="flex items-center gap-2">
        {!isForm && (
          <button 
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors active:scale-90"
            aria-label="Go back"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        
        <div className="flex items-center gap-2.5" onClick={onNewClick} style={{ cursor: 'pointer' }}>
          {LOGO_ICON_SVG}
          <div>
            <h1 className="text-sm font-black leading-none tracking-tight">URBAN COMPANY</h1>
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">
              {view === 'HISTORY' ? 'History' : view === 'PREVIEW' ? 'Preview' : 'Permissions'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {isForm ? (
          <button 
            onClick={onHistoryClick}
            className="text-xs font-bold text-gray-700 bg-gray-100 px-4 py-2 rounded-full active:bg-gray-200 transition-colors border border-gray-200"
          >
            History
          </button>
        ) : (
          <button 
            onClick={onNewClick}
            className="text-xs font-bold text-white bg-black px-4 py-2 rounded-full active:bg-gray-800 transition-colors shadow-sm"
          >
            + New
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
