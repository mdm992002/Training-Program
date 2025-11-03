
import React from 'react';
import { DaySchedule } from '../types';
import SessionCard from './SessionCard';

interface DayViewProps {
  schedule: DaySchedule;
  completedSessions: Set<string>;
  onToggleComplete: (sessionId: string) => void;
}

const DayView: React.FC<DayViewProps> = ({ schedule, completedSessions, onToggleComplete }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">{schedule.title}</h2>
        <p className="mt-2 text-lg text-gray-400">{schedule.subtitle}</p>
      </div>
      {schedule.sessions.map((session, index) => (
        <SessionCard 
          key={session.id} 
          session={session} 
          isCompleted={completedSessions.has(session.id)}
          onToggleComplete={() => onToggleComplete(session.id)}
        />
      ))}
    </div>
  );
};

export default DayView;
