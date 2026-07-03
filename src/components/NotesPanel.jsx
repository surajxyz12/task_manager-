import React, { useState, useEffect } from 'react';

function NotesPanel({ onClose }) {
  const [notes, setNotes] = useState(() => localStorage.getItem('quicknotes') || '');

  useEffect(() => {
    localStorage.setItem('quicknotes', notes);
  }, [notes]);

  return (
    <div className="absolute right-0 top-12 w-80 bg-[var(--surface)] border border-[var(--line)] shadow-2xl z-50">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--line)]">
        <p className="font-mono text-[11px] tracking-[0.25em] text-[var(--text-dim)]">NOTEPAD</p>
        <button
          onClick={onClose}
          className="text-[var(--text-dim)] hover:text-[var(--high)] font-mono text-sm"
        >
          ✕
        </button>
      </div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Jot something down..."
        rows={8}
        className="w-full bg-[var(--bg)] text-[var(--text)] placeholder-[var(--text-dim)] font-mono text-sm p-4 resize-none focus:outline-none"
      />
      <div className="px-4 py-2 border-t border-[var(--line)]">
        <p className="font-mono text-[10px] text-[var(--text-dim)] tracking-wide">
          AUTO-SAVED LOCALLY
        </p>
      </div>
    </div>
  );
}

export default NotesPanel;