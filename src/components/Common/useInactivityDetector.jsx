import { useEffect, useState } from 'react';

const INACTIVITY_TIMEOUT = 60 * 60 * 1000; // 1 hour

const useInactivityDetector = () => {
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    let timerId;
    let lastActivityTime = Date.now();

    const handleActivity = () => {
      lastActivityTime = Date.now();
      setInactive(false);
    };

    const handleInactivity = () => {
      if (Date.now() - lastActivityTime > INACTIVITY_TIMEOUT) {
        setInactive(true);
      }
    };

    document.addEventListener('mousemove', handleActivity);
    document.addEventListener('keydown', handleActivity);
    document.addEventListener('touchstart', handleActivity);

    timerId = setInterval(handleInactivity, 1000);

    return () => {
      document.removeEventListener('mousemove', handleActivity);
      document.removeEventListener('keydown', handleActivity);
      document.removeEventListener('touchstart', handleActivity);
      clearInterval(timerId);
    };
  }, []);

  return inactive;
};

export default useInactivityDetector;