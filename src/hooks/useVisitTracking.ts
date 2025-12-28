import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export function useVisitTracking() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track admin routes or auth pages
    if (pathname.includes('/dashboard') || pathname.includes('/login') || pathname.includes('/signup')) {
      return;
    }

    // Track visit asynchronously
    const trackVisit = async () => {
      try {
        await addDoc(collection(db, 'siteVisits'), {
          path: pathname,
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        // Silently fail - don't break the app for tracking errors
        console.debug('Visit tracking failed:', error);
      }
    };

    trackVisit();
  }, [pathname]);
}
