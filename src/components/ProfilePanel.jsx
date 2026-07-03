import React, { useRef } from 'react';

function ProfilePanel({ profile, setProfile, onClose }) {
  const fileInputRef = useRef(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfile({ ...profile, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="absolute right-0 top-12 w-72 bg-[var(--surface)] border border-[var(--line)] shadow-2xl z-50">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--line)]">
        <p className="font-mono text-[11px] tracking-[0.25em] text-[var(--text-dim)]">PROFILE</p>
        <button
          onClick={onClose}
          className="text-[var(--text-dim)] hover:text-[var(--high)] font-mono text-sm"
        >
          ✕
        </button>
      </div>

      <div className="p-5 flex flex-col items-center">
        <button
          onClick={() => fileInputRef.current.click()}
          className="relative w-16 h-16 rounded-full border border-[var(--line)] overflow-hidden mb-2 group"
        >
          {profile.photo ? (
            <img src={profile.photo} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[var(--bg)] flex items-center justify-center font-mono text-xl text-[var(--high)]">
              {profile.name ? profile.name[0].toUpperCase() : 'U'}
            </div>
          )}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-150">
            <span className="font-mono text-[9px] text-white tracking-wide">CHANGE</span>
          </div>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="hidden"
        />

        <div className="w-full mt-3 space-y-3">
          <div>
            <label className="font-mono text-[10px] tracking-widest text-[var(--text-dim)]">NAME</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full mt-1 bg-[var(--bg)] border border-[var(--line)] text-[var(--text)] font-mono text-sm px-3 py-2 focus:outline-none focus:border-[var(--high)]"
            />
          </div>
          <div>
            <label className="font-mono text-[10px] tracking-widest text-[var(--text-dim)]">USERNAME</label>
            <input
              type="text"
              value={profile.username}
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
              className="w-full mt-1 bg-[var(--bg)] border border-[var(--line)] text-[var(--text)] font-mono text-sm px-3 py-2 focus:outline-none focus:border-[var(--high)]"
            />
          </div>
        </div>
      </div>

      <div className="px-4 py-2 border-t border-[var(--line)]">
        <p className="font-mono text-[10px] text-[var(--text-dim)] tracking-wide">
          AUTO-SAVED LOCALLY
        </p>
      </div>
    </div>
  );
}

export default ProfilePanel;