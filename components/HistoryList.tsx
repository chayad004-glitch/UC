
import React from 'react';
import { PermissionLetterData } from '../types';
import { formatTimeWithAMPM } from '../constants';

interface HistoryListProps {
  letters: PermissionLetterData[];
  onSelect: (letter: PermissionLetterData) => void;
  onDelete: (id: string) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ letters, onSelect, onDelete }) => {
  if (letters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400 p-6 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
        </div>
        <h3 className="text-lg font-bold text-gray-600">No History Found</h3>
        <p className="mt-2 text-sm">Generate your first permission letter to see it here.</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-xl font-bold text-gray-800 mb-4 px-1">Permission History</h2>
      {letters.map((letter) => (
        <div 
          key={letter.id} 
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between group active:bg-gray-50 transition-colors"
        >
          <div className="flex-1 cursor-pointer" onClick={() => onSelect(letter)}>
            <h3 className="font-bold text-gray-800 line-clamp-1">{letter.societyName}</h3>
            <div className="flex gap-3 mt-1">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                {letter.eventDate}
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                {formatTimeWithAMPM(letter.startTime)}
              </span>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 font-medium uppercase tracking-wider">BDE: {letter.bdeName}</p>
          </div>
          
          <button 
            onClick={() => onDelete(letter.id)}
            className="p-2 text-gray-300 hover:text-red-500 active:bg-red-50 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default HistoryList;
