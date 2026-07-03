import React, { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    onAddTask(taskText, priority);
    setTaskText('');
    setPriority('medium');
  };

  const priorities = [
    { key: 'low', label: 'LOW', color: 'var(--low)' },
    { key: 'medium', label: 'MED', color: 'var(--medium)' },
    { key: 'high', label: 'HIGH', color: 'var(--high)' },
  ];

  return (
    <form onSubmit={handleSubmit} className="px-8 pt-6 pb-4">
      <div className="flex gap-2 items-stretch">
        <textarea
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          rows={1}
          placeholder="New order..."
          className="flex-1 bg-[var(--surface)] border border-[var(--line)] text-[var(--text)] placeholder-[var(--text-dim)] font-mono text-sm px-4 py-3 resize-none focus:outline-none focus:border-[var(--high)] transition-colors duration-150"
        />
        <button
          type="submit"
          className="font-display text-lg uppercase tracking-wide bg-[var(--high)] text-white px-6 border border-[var(--high)] hover:bg-transparent hover:text-[var(--high)] transition-colors duration-150"
        >
          Add
        </button>
      </div>

      <div className="flex items-center gap-3 mt-3">
        <span className="font-mono text-[10px] tracking-[0.25em] text-[var(--text-dim)]">
          PRIORITY
        </span>
        <div className="flex border border-[var(--line)]">
          {priorities.map((p) => (
            <button
              type="button"
              key={p.key}
              onClick={() => setPriority(p.key)}
              className="font-mono text-[11px] tracking-widest px-4 py-1.5 transition-colors duration-150"
              style={{
                color: priority === p.key ? '#000' : p.color,
                background: priority === p.key ? p.color : 'transparent',
                borderRight: p.key !== 'high' ? '1px solid var(--line)' : 'none',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}

export default TaskForm;