import React, { useCallback, useRef, useState } from 'react';

let idCounter = 0;

export function useToasts() {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const push = useCallback((message, type = 'success') => {
    const id = ++idCounter;
    setToasts((t) => [...t, { id, message, type }]);
    timers.current[id] = setTimeout(() => dismiss(id), 3200);
  }, [dismiss]);

  return { toasts, push, dismiss };
}

export default function ToastStack({ toasts, dismiss }) {
  if (!toasts.length) return null;
  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type === 'error' ? 'toast-error' : ''}`} onClick={() => dismiss(t.id)}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
