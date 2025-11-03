
import React from 'react';
import { Session } from '../types';
import { CheckIcon, SessionIcon, ActivityIcon, BreakIcon } from './icons';

interface SessionCardProps {
  session: Session;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

const SessionTypeIcon = ({ type }: { type: Session['type'] }) => {
    const iconClass = "w-6 h-6 mr-3 text-cyan-400";
    switch (type) {
        case 'session': return <SessionIcon className={iconClass} />;
        case 'activity': return <ActivityIcon className={iconClass} />;
        case 'break': return <BreakIcon className={iconClass} />;
        default: return null;
    }
};

const SessionCard: React.FC<SessionCardProps> = ({ session, isCompleted, onToggleComplete }) => {
  const cardBg = session.type === 'break' ? 'bg-gray-800' : 'bg-gray-800/50 backdrop-blur-sm';
  const completedStyles = isCompleted
    ? 'border-green-500/80 bg-green-900/20'
    : 'border-gray-700 hover:border-cyan-500';

  return (
    <div
      className={`relative rounded-xl border ${cardBg} p-6 shadow-lg transition-all duration-300 ${completedStyles}`}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4 flex flex-col items-start text-right">
          <div className="text-lg font-bold text-cyan-400">{session.time}</div>
          <div className="text-sm text-gray-400">{session.duration}</div>
        </div>
        
        <div className="flex-1">
          {session.sessionNumber && <div className="text-sm font-semibold text-gray-400 mb-1">{session.sessionNumber}</div>}
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
             <SessionTypeIcon type={session.type} />
            {session.title}
          </h3>
          
          {session.content.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-300 mb-2">المحتوى والأنشطة:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {session.content.map((item, index) => (
                  <li key={index} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          )}

          {session.outcomes.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-300 mb-2">المخرجات المتوقعة:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {session.outcomes.map((item, index) => (
                  <li key={index} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {session.type !== 'break' && (
        <button
          onClick={onToggleComplete}
          aria-label={isCompleted ? 'وضع علامة كغير مكتمل' : 'وضع علامة كمكتمل'}
          className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 ${
            isCompleted ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400 hover:bg-green-600 hover:text-white'
          }`}
        >
          <CheckIcon className="w-8 h-8" />
        </button>
      )}
    </div>
  );
};

export default SessionCard;
