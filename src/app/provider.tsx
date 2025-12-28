'use client';

import { AuthProvider } from '@/lib/auth-context';
import { Toaster } from 'react-hot-toast';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster position="top-right" />
    </AuthProvider>
  );
}
