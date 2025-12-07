// app/page.tsx
'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { ready, authenticated, login } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && authenticated) router.push('/profile');
  }, [ready, authenticated, router]);

  if (!ready) return <div style={{ padding: '2rem' }}>Загрузка...</div>;

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>❤️ Heart Connect</h1>
      <p>Знакомьтесь по всему миру — безопасно и без спама.</p>
      <button
        onClick={login}
        style={{
          marginTop: '1rem',
          padding: '0.75rem 1.5rem',
          fontSize: '1.1rem',
          backgroundColor: '#ff4d6d',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Войти с email
      </button>
    </div>
  );
}
