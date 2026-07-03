import React, { useState, useEffect } from 'react';
import NotesPanel from './NotesPanel';
import CalendarPanel from './CalendarPanel';
import ProfilePanel from './ProfilePanel';

function Header({ tasks }) {
  const [openPanel, setOpenPanel] = useState(null);

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('profile');
    return saved ? JSON.parse(saved) : { name: 'Suraj', username: '@suraj', photo: null };
  });

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  const togglePanel = (panel) => {
    setOpenPanel(openPanel === panel ? null : panel);
  };

  return (
    <header className="bg-[var(--bg)] text-[var(--text)] border-b border-[var(--line)] px-8 pt-8 pb-5">
      <div className="flex items-start justify-between max-w-6xl mx-auto">
        <div>
          <p className="font-mono text-[11px] tracking-[0.3em] text-[var(--text-dim)] mb-1">
            LOG // ACTIVE SESSION
          </p>
          <h1 className="font-display text-5xl font-extrabold uppercase tracking-wide leading-none">
            Task <span className="text-[var(--high)]">Manager</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              title="Calendar"
              onClick={() => togglePanel('calendar')}
              className={`w-9 h-9 flex items-center justify-center border transition-colors duration-150 ${
                openPanel === 'calendar'
                  ? 'border-[var(--high)] text-[var(--high)]'
                  : 'border-[var(--line)] text-[var(--text-dim)] hover:text-[var(--text)] hover:border-[var(--text)]'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="5" width="18" height="16" rx="1" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <line x1="8" y1="3" x2="8" y2="7" />
                <line x1="16" y1="3" x2="16" y2="7" />
              </svg>
            </button>
         {openPanel === 'calendar' && <CalendarPanel tasks={tasks} onClose={() => setOpenPanel(null)} />}
          </div>

          <div className="relative">
            <button
              title="Notes"
              onClick={() => togglePanel('notes')}
              className={`w-9 h-9 flex items-center justify-center border transition-colors duration-150 ${
                openPanel === 'notes'
                  ? 'border-[var(--high)] text-[var(--high)]'
                  : 'border-[var(--line)] text-[var(--text-dim)] hover:text-[var(--text)] hover:border-[var(--text)]'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
                <path d="M14 3v5h5" />
                <line x1="8" y1="13" x2="15" y2="13" />
                <line x1="8" y1="17" x2="12" y2="17" />
              </svg>
            </button>
            {openPanel === 'notes' && <NotesPanel onClose={() => setOpenPanel(null)} />}
          </div>

          <div className="w-px h-8 bg-[var(--line)]" />

          <div className="relative">
            <button onClick={() => togglePanel('profile')} className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-full bg-[var(--surface)] border border-[var(--line)] overflow-hidden flex items-center justify-center font-mono text-sm text-[var(--high)] group-hover:border-[var(--high)] transition-colors duration-150">
                {profile.photo ? (
                  <img src={profile.photo} alt="profile" className="w-full h-full object-cover" />
                ) : (
                  profile.name ? profile.name[0].toUpperCase() : 'U'
                )}
              </div>
              <div className="text-left hidden sm:block">
                <p className="font-mono text-xs text-[var(--text)] leading-none">{profile.name}</p>
                <p className="font-mono text-[10px] text-[var(--text-dim)] leading-none mt-1">
                  {profile.username}
                </p>
              </div>
            </button>
            {openPanel === 'profile' && (
              <ProfilePanel profile={profile} setProfile={setProfile} onClose={() => setOpenPanel(null)} />
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 flex gap-[3px] max-w-6xl mx-auto">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className={i % 5 === 0 ? 'h-3 w-px bg-[var(--text-dim)]' : 'h-2 w-px bg-[var(--line)]'}
          />
        ))}
      </div>
    </header>
  );
}

export default Header;