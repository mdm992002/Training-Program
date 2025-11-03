
export interface Session {
  time: string;
  duration: string;
  sessionNumber?: string;
  title: string;
  type: 'session' | 'break' | 'activity';
  content: string[];
  outcomes: string[];
  id: string;
}

export interface DaySchedule {
  day: number;
  title: string;
  subtitle: string;
  sessions: Session[];
}
