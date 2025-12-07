// app/profile/page.tsx
'use client';

import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const { authenticated } = usePrivy();
  const { wallets } = useWallets();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!authenticated) router.push('/');
  }, [authenticated, router]);

  const saveProfile = async () => {
    if (!name.trim()) {
      alert('Введите имя');
      return;
    }

    try {
      const wallet = wallets[0];
      const address = await wallet.getAddress();

      const res = await fetch('/api/save-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, name, bio }),
      });

      const { cid } = await res.json();
      localStorage.setItem('profileCID', cid);
      localStorage.setItem('profileName', name);
      router.push('/swipe');
    } catch (err) {
      console.error(err);
      alert('Ошибка сохранения профиля');
    }
  };

  if (!authenticated) return null;

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Создайте профиль</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ваше имя"
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Расскажите о себе"
        rows={4}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button
        onClick={saveProfile}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#ff4d6d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Готово → Листать анкеты
      </button>
    </div>
  );
}
