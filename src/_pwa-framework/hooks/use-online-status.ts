import { useEffect, useState } from 'react';

export const useOnlineStatus = () => {
  const [online, setOnline] = useState(
    typeof window !== 'undefined' ? window.navigator.onLine : true,
  );

  useEffect(() => {
    const handleStatusChange = () => {
      setOnline(navigator.onLine);
    };
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, []);
  return online;
};
