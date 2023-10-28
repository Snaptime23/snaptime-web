import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

// const verticalTabBarWidth = 60;
const desktopBreakpointLarge = 1260;
const desktopBreakpointSmall = 1060;
const defaultCommentOverlayWidth = 600;

interface CommentOverlayProps {
  width: number;
  hidden: boolean;
}

function useCommentOverlayWidth(): CommentOverlayProps {
  const windowSize = useWindowSize();
  const [commentOverlayWidth, setCommnetOverlayWidth] = useState<CommentOverlayProps>({
    width: defaultCommentOverlayWidth,
    hidden: true,
  });

  useEffect(() => {
    console.log(windowSize);
    if (windowSize.width < desktopBreakpointSmall) {
      setCommnetOverlayWidth({
        width: desktopBreakpointSmall - (desktopBreakpointLarge - defaultCommentOverlayWidth),
        hidden: true,
      });
    } else if (windowSize.width < desktopBreakpointLarge) {
      setCommnetOverlayWidth({
        width: windowSize.width - (desktopBreakpointLarge - defaultCommentOverlayWidth),
        hidden: false,
      });
    } else {
      setCommnetOverlayWidth({
        width: defaultCommentOverlayWidth,
        hidden: false,
      });
    }
  }, [windowSize]);

  return commentOverlayWidth;
}

export { useCommentOverlayWidth };
