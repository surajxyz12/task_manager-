import React, { useState, useEffect, useRef } from 'react';

function TimerWidget() {
  const [mode, setMode] = useState('timer');
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  const mm = Math.floor(seconds / 60).toString().padStart(2, '0');
  const ss = (seconds % 60).toString().padStart(2, '0');

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (mode === 'pomodoro') {
            if (prev <= 1) {
              setIsRunning(false);
              return 0;
            }
            return prev - 1;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, mode]);

  const toggleRunning = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(mode === 'pomodoro' ? 1500 : 0);
  };
  const switchMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setSeconds(newMode === 'pomodoro' ? 1500 : 0);
  };

  return (
    <div className="relative bg-[var(--surface)] border border-[var(--line)] p-6">
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--high)]" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--high)]" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--high)]" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--high)]" />

      <div className="flex gap-1 mb-6 font-mono text-[11px] tracking-widest">
        {['timer', 'pomodoro'].map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`flex-1 py-1.5 uppercase border transition-colors duration-150 ${
              mode === m
                ? 'bg-[var(--high)] border-[var(--high)] text-white'
                : 'border-[var(--line)] text-[var(--text-dim)] hover:text-[var(--text)]'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="text-center mb-6">
        <span className="font-mono text-6xl font-medium tabular-nums text-[var(--text)]">
          {mm}
          <span className={isRunning ? 'animate-tick' : ''}>:</span>
          {ss}
        </span>
        <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--text-dim)] mt-2 uppercase">
          {mode === 'pomodoro' ? 'Focus session' : 'Stopwatch'}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={toggleRunning}
          className="flex-1 font-mono text-xs tracking-widest uppercase bg-[var(--high)] text-white py-2.5 hover:bg-transparent hover:text-[var(--high)] border border-[var(--high)] transition-colors duration-150"
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="flex-1 font-mono text-xs tracking-widest uppercase border border-[var(--line)] text-[var(--text-dim)] py-2.5 hover:text-[var(--text)] hover:border-[var(--text)] transition-colors duration-150"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default TimerWidget;