
import React, { useState, useEffect } from 'react';
import { TRAINING_SCHEDULE } from './constants';
import DayView from './components/DayView';

const App: React.FC = () => {
  const [activeDay, setActiveDay] = useState<number>(1);
  const [completedSessions, setCompletedSessions] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('completedSessions');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch (error) {
      console.error("Failed to parse completed sessions from localStorage", error);
      return new Set();
    }
  });

  useEffect(() => {
    try {
        localStorage.setItem('completedSessions', JSON.stringify(Array.from(completedSessions)));
    } catch (error) {
        console.error("Failed to save completed sessions to localStorage", error);
    }
  }, [completedSessions]);

  const handleToggleComplete = (sessionId: string) => {
    setCompletedSessions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sessionId)) {
        newSet.delete(sessionId);
      } else {
        newSet.add(sessionId);
      }
      return newSet;
    });
  };

  const currentSchedule = TRAINING_SCHEDULE.find(d => d.day === activeDay);

  const getDayCompletionProgress = (day: number) => {
    const daySchedule = TRAINING_SCHEDULE.find(d => d.day === day);
    if (!daySchedule) return 0;
    
    const totalTasks = daySchedule.sessions.filter(s => s.type !== 'break').length;
    if (totalTasks === 0) return 100;

    const completedTasks = daySchedule.sessions.filter(s => s.type !== 'break' && completedSessions.has(s.id)).length;
    
    return (completedTasks / totalTasks) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            إطلاق قدرات المستقبل في التعليم
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            برنامج تدريبي تفاعلي حول توظيف الذكاء الاصطناعي والواقع الافتراضي
          </p>
        </header>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-2 mb-8 sticky top-4 z-10">
          <div className="flex justify-around">
            {TRAINING_SCHEDULE.map(dayInfo => {
              const progress = getDayCompletionProgress(dayInfo.day);
              return (
                <button
                  key={dayInfo.day}
                  onClick={() => setActiveDay(dayInfo.day)}
                  className={`relative w-full text-center px-4 py-3 rounded-lg text-sm sm:text-base font-bold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 ${
                    activeDay === dayInfo.day ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="relative z-10">اليوم {dayInfo.day}</span>
                  <div 
                    className="absolute bottom-0 right-0 h-1 bg-green-500 rounded-b-lg transition-all duration-500"
                    style={{width: `${progress}%`}}
                  ></div>
                </button>
              );
            })}
          </div>
        </div>

        <main>
          {currentSchedule ? (
            <DayView 
              schedule={currentSchedule} 
              completedSessions={completedSessions}
              onToggleComplete={handleToggleComplete}
            />
          ) : (
            <p>لم يتم العثور على جدول اليوم المحدد.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
