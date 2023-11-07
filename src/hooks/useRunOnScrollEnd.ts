import { RefObject, useEffect, useRef } from 'react';

type Task = () => void;

function useRunOnScrollEnd(ref: RefObject<HTMLElement>, delay = 100) {
  const scrollEndTimeout = useRef<number | null>(null);
  const taskQueue = useRef<Task[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollEndTimeout.current) {
        window.clearTimeout(scrollEndTimeout.current);
      }
      scrollEndTimeout.current = window.setTimeout(() => {
        console.debug('scroll end');
        while (taskQueue.current.length > 0) {
          const task = taskQueue.current.shift();
          if (task) {
            task();
          }
        }
      }, delay);
    };

    const node = ref.current;
    if (node) {
      node.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (node) {
        node.removeEventListener('scroll', handleScroll);
      }
      if (scrollEndTimeout.current) {
        clearTimeout(scrollEndTimeout.current);
      }
    };
  }, [ref, delay]);

  const addTask = (task: Task) => {
    taskQueue.current.push(task);
  };

  return addTask;
}

export { useRunOnScrollEnd };
