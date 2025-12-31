import { Flame, BookOpen, Target, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StatsCard = () => {
  const { subjects, sessions, settings } = useApp();

  const activeSubjects = subjects.filter((s) => s.status === 'active').length;
  const totalSessions = sessions.length;
  const totalHours = (
    sessions.reduce((acc, s) => acc + s.duration_minutes, 0) / 60
  ).toFixed(1);
  const streak = settings?.study_streak || 0;

  const motivationalMessages = [
    "You're on fire! Keep going!",
    'Consistency is key to success!',
    'Every session counts!',
    'Your future self will thank you!',
    'Progress, not perfection!',
    'Small steps lead to big results!',
    "You're building great habits!",
  ];

  const message =
    motivationalMessages[
      Math.floor(Math.random() * motivationalMessages.length)
    ];

  return (
    <div className="bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-800 rounded-2xl shadow-xl p-8 text-white animate-slide-up hover:shadow-2xl transition-smooth">
      <div className="flex items-center gap-3 mb-6">
        <Flame className="w-8 h-8" />
        <div>
          <h2 className="text-2xl font-bold">Study Stats</h2>
          <p className="text-sm opacity-90">{message}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 transition-smooth hover:bg-white/30 hover:scale-105 transform animate-slide-up">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 animate-pulse-soft" />
            <span className="text-sm opacity-90">Streak</span>
          </div>
          <div className="text-3xl font-bold">{streak} days</div>
        </div>

        <div
          className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 transition-smooth hover:bg-white/30 hover:scale-105 transform animate-slide-up"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5" />
            <span className="text-sm opacity-90">Total Hours</span>
          </div>
          <div className="text-3xl font-bold">{totalHours}h</div>
        </div>

        <div
          className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 transition-smooth hover:bg-white/30 hover:scale-105 transform animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5" />
            <span className="text-sm opacity-90">Active Subjects</span>
          </div>
          <div className="text-3xl font-bold">{activeSubjects}</div>
        </div>

        <div
          className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 transition-smooth hover:bg-white/30 hover:scale-105 transform animate-slide-up"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm opacity-90">Sessions</span>
          </div>
          <div className="text-3xl font-bold">{totalSessions}</div>
        </div>
      </div>
    </div>
  );
};
