// app/layout.tsx
'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { XMSDKProvider } from '@xmtp/react-sdk';
import './globals.css';

// 🔑 ЗАМЕНИ НА СВОЙ PRIVY APP ID
const PRIVY_APP_ID = 'cmiva0v2b059jjp0d6lywmckm';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff4d6d" />
        <meta name="description" content="Знакомства по всему миру — безопасно и без спама." />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body>
        <PrivyProvider
          appId={PRIVY_APP_ID}
          config={{
            loginMethods: ['email'],
            embeddedWallets: { createOnLogin: 'all-users' },
            supportedChains: [{ chainId: 84532 }], // Base Sepolia
          }}
        >
          <XMSDKProvider>{children}</XMSDKProvider>
        </PrivyProvider>
      </body>
    </html>
  );
}
