import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useAlwaysUseDarkTabbar = () => {
  const location = useLocation();
  const [isAlwaysDark, setIsAlwaysDark] = useState(location.pathname === '/');
  useEffect(() => {
    if (location.pathname === '/') {
      setIsAlwaysDark(true);
    } else {
      setIsAlwaysDark(false);
    }
  }, [location]);
  return isAlwaysDark;
};

export { useAlwaysUseDarkTabbar };
