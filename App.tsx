import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import IATTest from './components/IATTest';

// Simple UUID generator
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const Dashboard = ({ startTest }: { startTest: () => void }) => {
  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 gap-8">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-6 leading-tight drop-shadow-sm">
            Имплицитные ассоциативные тесты
          </h1>
        </div>

        {/* Start Test Card */}
        <div className="bg-gradient-to-r from-blue-900/40 to-slate-800/40 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-slate-700/50 shadow-2xl flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Готовы пройти тест?</h2>
          <p className="text-blue-100 mb-10 max-w-2xl text-lg leading-relaxed opacity-90">
            Тест займет около 5-10 минут. Вам предстоит классифицировать слова и изображения как можно быстрее.
          </p>
          <button 
            onClick={startTest}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xl font-bold py-4 px-12 rounded-full shadow-lg shadow-emerald-500/20 transform hover:scale-105 transition-all active:scale-95 border-t border-emerald-400/20"
          >
            Начать Тест
          </button>
        </div>

      </div>
    </div>
  );
};

const AppContent = () => {
  const [session, setSession] = useState<any>(null);
  const [testActive, setTestActive] = useState(false);

  useEffect(() => {
    // Initialize Session
    const userId = generateUUID();
    const referrer = document.referrer || "direct";
    const newSession = {
      userId,
      referrer,
      startTime: Date.now()
    };
    setSession(newSession);
    console.log(`User initialized: ${userId}`);
  }, []);

  const handleStartTest = () => {
    if (session) {
      setTestActive(true);
    } else {
      console.warn("Session not initialized yet");
    }
  };

  const handleTestComplete = () => {
    setTestActive(false);
  };

  if (testActive && session) {
    return <IATTest session={session} onComplete={handleTestComplete} />;
  }

  return <Dashboard startTest={handleStartTest} />;
};

const App = () => {
  return (
    <HashRouter>
       <Routes>
         <Route path="/" element={<AppContent />} />
       </Routes>
    </HashRouter>
  );
};

export default App;
