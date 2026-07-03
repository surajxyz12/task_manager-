import React, { useState } from 'react';

function CalendarPanel({ tasks, onClose }) {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const today = new Date();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthName = viewDate.toLocaleString('default', { month: 'long' });

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const changeMonth = (delta) => {
    setViewDate(new Date(year, month + delta, 1));
    setSelectedDay(null);
  };

  const isToday = (day) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const tasksOnDay = (day) => {
    if (!day) return [];
    return tasks.filter((t) => {
      const d = new Date(t.createdAt || t.id);
      return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
    });
  };

  const cells = [];
  for (let i = 0; i < firstDayIndex; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const selectedTasks = selectedDay ? tasksOnDay(selectedDay) : [];

  return (
    <div className="absolute right-0 top-12 w-80 bg-[var(--surface)] border border-[var(--line)] shadow-2xl z-50">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--line)]">
        <p className="font-mono text-[11px] tracking-[0.25em] text-[var(--text-dim)]">CALENDAR</p>
        <button onClick={onClose} className="text-[var(--text-dim)] hover:text-[var(--high)] font-mono text-sm">
          ✕
        </button>
      </div>

      <div className="flex items-center justify-between px-4 py-2">
        <button onClick={() => changeMonth(-1)} className="text-[var(--text-dim)] hover:text-[var(--text)] font-mono text-sm px-2">
          ‹
        </button>
        <p className="font-mono text-xs tracking-widest text-[var(--text)] uppercase">
          {monthName} {year}
        </p>
        <button onClick={() => changeMonth(1)} className="text-[var(--text-dim)] hover:text-[var(--text)] font-mono text-sm px-2">
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 px-4 pb-3">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} className="text-center font-mono text-[9px] text-[var(--text-dim)] py-1">
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          const hasTasks = tasksOnDay(day).length > 0;
          return (
            <button
              key={i}
              disabled={!day}
              onClick={() => setSelectedDay(day)}
              className={`relative text-center font-mono text-xs py-1.5 transition-colors duration-150 ${
                day === null
                  ? ''
                  : selectedDay === day
                  ? 'bg-[var(--high)] text-white'
                  : isToday(day)
                  ? 'border border-[var(--high)] text-[var(--high)]'
                  : 'text-[var(--text)] hover:bg-[var(--bg)]'
              }`}
            >
              {day || ''}
              {hasTasks && day !== selectedDay && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--medium)]" />
              )}
            </button>
          );
        })}
      </div>

      <div className="border-t border-[var(--line)] px-4 py-3 max-h-48 overflow-y-auto">
        <p className="font-mono text-[10px] tracking-widest text-[var(--text-dim)] mb-2">
          {selectedDay ? `TASKS · ${String(selectedDay).padStart(2, '0')} ${monthName.slice(0, 3).toUpperCase()}` : 'SELECT A DATE'}
        </p>
        {selectedTasks.length === 0 ? (
          <p className="font-mono text-xs text-[var(--text-dim)]">No tasks logged</p>
        ) : (
          <div className="space-y-1.5">
            {selectedTasks.map((t) => (
              <div key={t.id} className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{
                    background:
                      t.priority === 'high' ? 'var(--high)' : t.priority === 'medium' ? 'var(--medium)' : 'var(--low)',
                  }}
                />
                <span
                  className={`font-mono text-xs truncate ${
                    t.completed ? 'line-through text-[var(--text-dim)]' : 'text-[var(--text)]'
                  }`}
                >
                  {t.text}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CalendarPanel;