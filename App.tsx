
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PermissionForm from './components/PermissionForm';
import LetterPreview from './components/LetterPreview';
import HistoryList from './components/HistoryList';
import { AppView, PermissionLetterData } from './types';
import { getLetters, saveLetter, deleteLetter } from './services/storageService';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('FORM');
  const [activeLetter, setActiveLetter] = useState<PermissionLetterData | null>(null);
  const [history, setHistory] = useState<PermissionLetterData[]>([]);

  useEffect(() => {
    setHistory(getLetters());
  }, []);

  const handleFormSubmit = (data: PermissionLetterData) => {
    saveLetter(data);
    setActiveLetter(data);
    setHistory(getLetters());
    setView('PREVIEW');
  };

  const handleHistorySelect = (letter: PermissionLetterData) => {
    setActiveLetter(letter);
    setView('PREVIEW');
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this permission record?")) {
      deleteLetter(id);
      setHistory(getLetters());
    }
  };

  const handleBack = () => {
    if (view === 'PREVIEW' && activeLetter) {
      setView('FORM');
    } else {
      setView('FORM');
      setActiveLetter(null);
    }
  };

  const navigateToHistory = () => setView('HISTORY');
  const navigateToForm = () => {
    setActiveLetter(null);
    setView('FORM');
  };
  const navigateToEdit = () => setView('FORM');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-xl mx-auto shadow-2xl relative">
      <Header 
        view={view}
        onBack={handleBack}
        onHistoryClick={navigateToHistory} 
        onNewClick={navigateToForm} 
      />
      
      <main className="flex-1 pb-10">
        {view === 'FORM' && (
          <PermissionForm 
            initialData={activeLetter} 
            onSubmit={handleFormSubmit} 
          />
        )}
        
        {view === 'PREVIEW' && activeLetter && (
          <LetterPreview 
            data={activeLetter} 
            onEdit={navigateToEdit} 
          />
        )}
        
        {view === 'HISTORY' && (
          <HistoryList 
            letters={history} 
            onSelect={handleHistorySelect} 
            onDelete={handleDelete} 
          />
        )}
      </main>

      {/* Floating Action Button for adding new if in History */}
      {view === 'HISTORY' && (
        <button 
          onClick={navigateToForm}
          className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 rounded-full shadow-2xl flex items-center justify-center text-white active:scale-90 transition-transform z-50"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/></svg>
        </button>
      )}
    </div>
  );
};

export default App;
