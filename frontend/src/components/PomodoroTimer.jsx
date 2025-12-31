import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PomodoroTimer = () => {
  const { subjects, addSession } = useApp();

  const [focusTime, setFocusTime] = useState(25);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [customTime, setCustomTime] = useState('');

  /* ================= TIMER LOGIC ================= */
  useEffect(() => {
    let interval = null;

    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);

            if (!isBreak && selectedSubject) {
              addSession({
                subject_id: selectedSubject,
                duration_minutes: focusTime,
                session_date: new Date().toISOString().split('T')[0],
                completed: true,
                notes: 'Pomodoro session',
              });
            }

            const nextIsBreak = !isBreak;
            setIsBreak(nextIsBreak);
            setMinutes(nextIsBreak ? 5 : focusTime);
            setSeconds(0);
          } else {
            setMinutes((m) => m - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((s) => s - 1);
        }
      }, 1000);
    }

    return () => interval && clearInterval(interval);
  }, [isActive, minutes, seconds, isBreak, selectedSubject, focusTime, addSession]);

  /* ================= CONTROLS ================= */
  const toggleTimer = () => {
    if (!isActive && !selectedSubject && !isBreak) {
      alert('Please select a subject first!');
      return;
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(isBreak ? 5 : focusTime);
    setSeconds(0);
  };

  const activeSubjects = subjects.filter((s) => s.status === 'active');

  /* ================= UI ================= */
  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-900 
                    rounded-2xl shadow-xl p-8 text-white animate-slide-up hover:shadow-2xl transition-smooth">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Timer className="w-8 h-8" />
        <h2 className="text-2xl font-bold">Pomodoro Timer</h2>
      </div>

      {/* Time Display */}
      <div className="text-center mb-8 animate-fade-in">
        <div className="text-7xl font-bold mb-2 font-mono animate-pulse-soft">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <div className="text-xl opacity-90">
          {isBreak ? 'Break Time' : 'Focus Time'}
        </div>
      </div>

      {/* Focus Time Selector */}
      {!isBreak && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 opacity-90">
            Focus Time (minutes)
          </label>

          <div className="flex gap-3 flex-wrap">
            {[25, 30, 45].map((time) => (
              <button
                key={time}
                onClick={() => {
                  setFocusTime(time);
                  setMinutes(time);
                  setSeconds(0);
                  setIsActive(false);
                }}
                className={`px-4 py-2 rounded-lg border transition-smooth hover:scale-105
                  ${
                    focusTime === time
                      ? 'bg-white text-blue-700 font-bold'
                      : 'bg-white/20 text-white border-white/30'
                  }`}
              >
                {time} min
              </button>
            ))}

            {/* <input
              type="number"
              min="1"
              placeholder="Custom"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              onBlur={() => {
                if (customTime) {
                  const value = Number(customTime);
                  setFocusTime(value);
                  setMinutes(value);
                  setSeconds(0);
                  setIsActive(false);
                }
              }}
              className="w-24 px-3 py-2 rounded-lg bg-white/20 text-white 
                         placeholder-white/70 border border-white/30 focus:outline-none"
            /> */}

            <input
                type="number"
                min="1"
                placeholder="Custom(min)"
                value={customTime}
                onChange={(e) => {
                    setCustomTime(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && customTime) {
                    const value = Number(customTime);
                    if (value > 0) {
                        setFocusTime(value);
                        setMinutes(value);
                        setSeconds(0);
                        setIsActive(false);
                    }
                    }
                }}
                className="
                w-40 px-3 py-2 rounded-lg bg-white/20 text-white 
                            placeholder-white/70 border border-white/30 focus:outline-none"
            />

          </div>
        </div>
      )}

      {/* Subject Selector */}
      {!isBreak && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 opacity-90">
            Studying:
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            disabled={isActive}
            className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm 
                       border border-white/30 focus:ring-2 focus:ring-white/50 
                       disabled:opacity-50 text-white"
          >
            <option value="" className="text-gray-900">
              Select a subject
            </option>
            {activeSubjects.map((subject) => (
              <option
                key={subject.id}
                value={subject.id}
                className="text-gray-900"
              >
                {subject.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={toggleTimer}
          className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm 
                     border border-white/30 rounded-lg py-3 px-6 font-medium 
                     transition-smooth hover:scale-105 flex items-center 
                     justify-center gap-2 active:scale-95"
        >
          {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          {isActive ? 'Pause' : 'Start'}
        </button>

        <button
          onClick={resetTimer}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm 
                     border border-white/30 rounded-lg py-3 px-6 
                     transition-smooth hover:scale-105 hover:rotate-180 active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
