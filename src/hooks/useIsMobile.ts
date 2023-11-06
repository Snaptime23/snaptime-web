import { useMediaQuery } from 'usehooks-ts';

const useIsMobile = () => {
  const isMobile = useMediaQuery('(max-width: 540px)');
  return isMobile;
};

export { useIsMobile };
