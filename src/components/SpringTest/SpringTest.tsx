import { animated, useSpring } from '@react-spring/web';
import { FC, useState } from 'react';
import useMeasure from 'react-use-measure';

import styles from './styles.module.scss';

export const SpringTest: FC = () => {
  const [open, setOpen] = useState(false);
  const [ref, { width }] = useMeasure();
  const spring = useSpring({ width: open ? width : 0 });

  return (
    <div className={styles.container}>
      <div ref={ref} className={styles.main} onClick={() => setOpen(!open)}>
        <animated.div className={styles.fill} style={spring} />
        <animated.div className={styles.content}>{spring.width.to((x) => x.toFixed(0))}</animated.div>
      </div>
    </div>
  );
};
