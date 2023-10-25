import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../store/index.ts';
import { decrement, increment } from '../store/slices/couter.ts';
import styles from './Counter.module.scss';

const Counter: FC = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <button aria-label="Decrement value" className={`${styles.button}`} onClick={() => dispatch(decrement())}>
        -
      </button>
      <div className="inline-block min-w-[2rem] text-center">{count}</div>
      <button aria-label="Increment value" className={`${styles.button}`} onClick={() => dispatch(increment())}>
        +
      </button>
    </div>
  );
};

export { Counter };
