import React, { useState } from 'react';

function TaskList({ tasks, onDeleteTask, onToggleTask, onEditTask, filter, onFilterChange }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [expandedTasks, setExpandedTasks] = useState({});

  const toggleExpand = (id) => setExpandedTasks({ ...expandedTasks, [id]: !expandedTasks[id] });
  const priorityVars = { low: 'var(--low)', medium: 'var(--medium)', high: 'var(--high)' };

  const startEdit = (id, currentText) => {
    setEditingIndex(id);
    setEditText(currentText);
  };
  const saveEdit = (id) => {
    onEditTask(id, editText);
    setEditingIndex(null);
  };

  return (
    <>
      <div className="flex gap-1 px-8 mb-4 font-mono text-[11px] tracking-widest">
        {['all', 'high', 'medium', 'low'].map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`px-3 py-1.5 uppercase border-b-2 transition-colors duration-150 ${
              filter === f
                ? 'border-[var(--high)] text-[var(--text)]'
                : 'border-transparent text-[var(--text-dim)] hover:text-[var(--text)]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="px-8 pb-8 space-y-2">
        {tasks.length === 0 && (
          <li className="font-mono text-xs text-[var(--text-dim)] tracking-wide py-8 text-center border border-dashed border-[var(--line)]">
            NO ORDERS LOGGED
          </li>
        )}
        {tasks.map((task, i) => (
          <li
            key={task.id}
            className="animate-rise bg-[var(--surface)] border border-[var(--line)] flex hover:border-[var(--text-dim)] transition-colors duration-150"
            style={{ animationDelay: `${Math.min(i, 8) * 30}ms` }}
          >
            <div className="w-1" style={{ background: priorityVars[task.priority] }} />

            <div className="flex-1 flex items-start justify-between gap-3 px-4 py-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <span className="font-mono text-[10px] text-[var(--text-dim)] mt-1 w-6 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleTask(task.id)}
                  className="mt-1 w-4 h-4 accent-[var(--high)] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  {editingIndex === task.id ? (
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      rows={2}
                      className="w-full bg-[var(--bg)] border border-[var(--line)] text-[var(--text)] font-mono text-sm px-2 py-1 resize-none focus:outline-none focus:border-[var(--high)]"
                    />
                  ) : (
                    <>
                      <span
                        className={`block break-words whitespace-pre-wrap font-sans text-sm ${
                          task.completed ? 'line-through text-[var(--text-dim)]' : 'text-[var(--text)]'
                        }`}
                      >
                        {expandedTasks[task.id]
                          ? task.text
                          : `${task.text.replace(/\n/g, ' ').slice(0, 60)}${
                              task.text.length > 60 || task.text.includes('\n') ? '...' : ''
                            }`}
                      </span>
                      {task.text.length > 60 && (
                        <button
                          onClick={() => toggleExpand(task.id)}
                          className="font-mono text-[10px] tracking-wide text-[var(--high)] mt-1 hover:underline"
                        >
                          {expandedTasks[task.id] ? 'COLLAPSE' : 'EXPAND'}
                        </button>
                      )}
                      <p className="font-mono text-[10px] text-[var(--text-dim)] mt-1">
                        {new Date(task.createdAt || task.id).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}{' '}
                        ·{' '}
                        {new Date(task.createdAt || task.id).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <span
                  className="font-mono text-[10px] tracking-widest px-2 py-1 uppercase"
                  style={{ color: priorityVars[task.priority], border: `1px solid ${priorityVars[task.priority]}` }}
                >
                  {task.priority}
                </span>
                {editingIndex === task.id ? (
                  <button
                    onClick={() => saveEdit(task.id)}
                    className="font-mono text-[10px] tracking-widest px-2 py-1 border border-[var(--low)] text-[var(--low)] hover:bg-[var(--low)] hover:text-black transition-colors duration-150"
                  >
                    SAVE
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(task.id, task.text)}
                    className="font-mono text-[10px] tracking-widest px-2 py-1 border border-[var(--line)] text-[var(--text-dim)] hover:border-[var(--text)] hover:text-[var(--text)] transition-colors duration-150"
                  >
                    EDIT
                  </button>
                )}
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="font-mono text-[10px] tracking-widest px-2 py-1 border border-[var(--line)] text-[var(--text-dim)] hover:border-[var(--high)] hover:text-[var(--high)] transition-colors duration-150"
                >
                  DEL
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TaskList;