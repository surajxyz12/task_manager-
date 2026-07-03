import React, { useState } from 'react';

function Analytics({ tasks }) {
  const [period, setPeriod] = useState('day');

  const isInPeriod = (timestamp) => {
    if (!timestamp) return false;
    const now = new Date();
    const date = new Date(timestamp);
    if (period === 'day') return date.toDateString() === now.toDateString();
    if (period === 'week') {
      const weekAgo = new Date(now);
      weekAgo.setDate(now.getDate() - 7);
      return date >= weekAgo && date <= now;
    }
    if (period === 'month')
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    if (period === 'year') return date.getFullYear() === now.getFullYear();
    return false;
  };

  const completedInPeriod = tasks.filter((t) => t.completed && isInPeriod(t.completedAt));
  const createdInPeriod = tasks.filter((t) => isInPeriod(t.createdAt || t.id));
  const pendingInPeriod = createdInPeriod.filter((t) => !t.completed);

  const byPriority = {
    high: completedInPeriod.filter((t) => t.priority === 'high').length,
    medium: completedInPeriod.filter((t) => t.priority === 'medium').length,
    low: completedInPeriod.filter((t) => t.priority === 'low').length,
  };
  const maxCount = Math.max(byPriority.high, byPriority.medium, byPriority.low, 1);

  const rows = [
    { key: 'high', label: 'HIGH', color: 'var(--high)' },
    { key: 'medium', label: 'MED', color: 'var(--medium)' },
    { key: 'low', label: 'LOW', color: 'var(--low)' },
  ];

  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <p className="font-mono text-[11px] tracking-[0.3em] text-[var(--text-dim)]">ANALYTICS</p>
        <div className="flex gap-1 font-mono text-[10px] tracking-widest">
          {['day', 'week', 'month', 'year'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-2 py-1 uppercase border transition-colors duration-150 ${
                period === p
                  ? 'bg-[var(--high)] border-[var(--high)] text-white'
                  : 'border-[var(--line)] text-[var(--text-dim)] hover:text-[var(--text)]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px bg-[var(--line)] mb-5">
        <div className="bg-[var(--bg)] p-4 text-center">
          <p className="font-mono text-3xl text-[var(--low)]">{completedInPeriod.length}</p>
          <p className="font-mono text-[10px] tracking-widest text-[var(--text-dim)] mt-1">DONE</p>
        </div>
        <div className="bg-[var(--bg)] p-4 text-center">
          <p className="font-mono text-3xl text-[var(--medium)]">{pendingInPeriod.length}</p>
          <p className="font-mono text-[10px] tracking-widest text-[var(--text-dim)] mt-1">PENDING</p>
        </div>
      </div>

      <div className="flex-1 space-y-3">
        {rows.map((r) => (
          <div key={r.key} className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-widest w-10" style={{ color: r.color }}>
              {r.label}
            </span>
            <div className="flex-1 h-2 bg-[var(--bg)] border border-[var(--line)]">
              <div
                className="h-full transition-all duration-500"
                style={{ width: `${(byPriority[r.key] / maxCount) * 100}%`, background: r.color }}
              />
            </div>
            <span className="font-mono text-xs text-[var(--text)] w-4 text-right">{byPriority[r.key]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Analytics;