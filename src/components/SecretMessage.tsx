import { useState } from 'react';
import { Heart, Lock, Unlock, Edit3, X } from 'lucide-react';
import SunflowerDivider from './SunflowerDivider';
import EditableText from './EditableText';

type SecretMessageProps = {
  secretMessage: { title: string; body: string; password: string };
  onSecretMessageChange: (v: { title: string; body: string; password: string }) => void;
};

export default function SecretMessage({ secretMessage, onSecretMessageChange }: SecretMessageProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [error, setError] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  const hasPassword = secretMessage.password.trim().length > 0;

  const handleUnlock = () => {
    if (!hasPassword) {
      setUnlocked(true);
      return;
    }
    if (inputPassword === secretMessage.password) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleLock = () => {
    setUnlocked(false);
    setInputPassword('');
    setError(false);
  };

  return (
    <section id="secret" className="relative py-20 px-4 sm:px-6 paper-bg">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 fade-in">
          <p className="font-parisienne text-lg text-[var(--golden-dark)] mb-2">Chapter Twelve</p>
          <h2 className="font-script text-4xl sm:text-5xl text-[var(--brown)] mb-4">
            A Secret Message
          </h2>
          <SunflowerDivider />
          <p className="font-body text-[var(--brown-light)] max-w-xl mx-auto leading-relaxed">
            {hasPassword
              ? 'This message is locked. Enter the password to read what I wrote only for you.'
              : 'Tap the lock to reveal a hidden message written only for your eyes.'}
          </p>
        </div>

        {/* Locked / Unlocked card */}
        <div className="cream-card rounded-2xl p-6 sm:p-8 fade-in shadow-sm">
          {!unlocked ? (
            /* Locked state */
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--golden)]/15 mb-4">
                <Lock className="w-8 h-8 text-[var(--golden-dark)] lock-pulse" strokeWidth={1.5} />
              </div>

              {hasPassword ? (
                <>
                  <p className="font-hand text-xl text-[var(--brown)] mb-4">
                    Enter the secret password to unlock
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto">
                    <input
                      type="password"
                      value={inputPassword}
                      onChange={(e) => { setInputPassword(e.target.value); setError(false); }}
                      onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                      placeholder="Password..."
                      className="w-full sm:flex-1 bg-[var(--cream)] border border-[var(--golden-dark)]/30 rounded-xl px-4 py-2.5 font-body text-sm text-[var(--brown)] outline-none focus:border-[var(--golden-dark)] focus:ring-2 focus:ring-[var(--golden)]/20 transition-all text-center"
                    />
                    <button
                      onClick={handleUnlock}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--golden)] to-[var(--golden-dark)] text-[var(--brown)] font-body font-semibold shadow-md hover:scale-105 active:scale-95 transition-transform"
                    >
                      <Unlock className="w-5 h-5" strokeWidth={1.8} />
                      Unlock
                    </button>
                  </div>
                  {error && (
                    <p className="font-hand text-lg text-[#c0392b] mt-3">
                      Oops, wrong password. Try again!
                    </p>
                  )}
                </>
              ) : (
                <>
                  <p className="font-hand text-xl text-[var(--brown)] mb-4">
                    A hidden message waits for you
                  </p>
                  <button
                    onClick={handleUnlock}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--golden)] to-[var(--golden-dark)] text-[var(--brown)] font-body font-semibold shadow-md hover:scale-105 active:scale-95 transition-transform"
                  >
                    <Unlock className="w-5 h-5" strokeWidth={1.8} />
                    Reveal the Secret
                  </button>
                </>
              )}
            </div>
          ) : (
            /* Unlocked state */
            <div className="secret-reveal-anim">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[var(--golden-dark)]">
                  <Unlock className="w-5 h-5" strokeWidth={1.8} />
                  <span className="font-body text-sm font-semibold uppercase tracking-wider">Secret Revealed</span>
                </div>
                <button
                  onClick={handleLock}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--cream)] border border-[var(--golden-dark)]/20 text-[var(--brown-light)] font-body text-xs font-medium hover:bg-[var(--golden)]/10 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5" strokeWidth={1.8} />
                  Lock Again
                </button>
              </div>

              <SunflowerDivider />

              <EditableText
                as="h3"
                value={secretMessage.title}
                onChange={(v) => onSecretMessageChange({ ...secretMessage, title: v })}
                className="font-dancing text-2xl sm:text-3xl text-[var(--golden-dark)] text-center mb-4"
              />

              <EditableText
                as="div"
                value={secretMessage.body}
                onChange={(v) => onSecretMessageChange({ ...secretMessage, body: v })}
                multiline
                className="font-hand text-lg sm:text-xl text-[var(--brown)] leading-relaxed whitespace-pre-wrap block text-center"
              />

              <div className="flex items-center justify-center gap-1 mt-6 text-[var(--soft-pink-2)]">
                <Heart className="w-4 h-4 fill-current" />
                <span className="font-body text-xs text-[var(--brown-light)]">Click the text to edit</span>
                <Heart className="w-4 h-4 fill-current" />
              </div>
            </div>
          )}
        </div>

        {/* Password manager (always accessible for editing) */}
        <div className="mt-4 text-center">
          {!editingPassword ? (
            <button
              onClick={() => setEditingPassword(true)}
              className="inline-flex items-center gap-1.5 text-[var(--brown-light)] font-body text-xs hover:text-[var(--brown)] transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" strokeWidth={1.5} />
              {hasPassword ? 'Change password' : 'Set a password (optional)'}
            </button>
          ) : (
            <div className="cream-card rounded-xl p-4 max-w-sm mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={secretMessage.password}
                  onChange={(e) => onSecretMessageChange({ ...secretMessage, password: e.target.value })}
                  placeholder="Enter new password (leave empty for no password)"
                  className="flex-1 bg-[var(--cream)] border border-[var(--golden-dark)]/30 rounded-lg px-3 py-2 font-body text-sm text-[var(--brown)] outline-none focus:border-[var(--golden-dark)]"
                />
                <button
                  onClick={() => setEditingPassword(false)}
                  className="p-2 rounded-lg text-[var(--brown-light)] hover:text-[var(--brown)] hover:bg-[var(--golden)]/10 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="font-body text-xs text-[var(--brown-light)]">
                {hasPassword ? 'Password set. The secret will require this password.' : 'No password — the secret can be revealed with one click.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
