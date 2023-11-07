import EventEmitter from 'eventemitter3';
import { createContext, useContext, useEffect } from 'react';

type EventHandlers<T> = {
  [K in keyof T]: (event: T[K]) => void | Promise<void>;
};

export function createReactEmitter<Events>() {
  const emitter = new EventEmitter<EventHandlers<Events>, never>();
  const EmitterContext = createContext(emitter);
  const useEmitter = () => useContext(EmitterContext);

  function useListenEvent<T extends keyof Events>(event: T, listener: EventHandlers<Events>[T]) {
    const emitter = useEmitter();
    useEffect(() => {
      // @ts-expect-error todo
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      emitter.addListener(event, listener);
      return () => {
        // @ts-expect-error todo
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        emitter.removeListener(event, listener);
      };
    }, [emitter, event, listener]);
  }

  // function useEmitEvent<T extends keyof Events> (event: T, data: Events[]) (
  //   event,
  //   data,
  //   depsList: DependencyList
  // ) => {
  //   const emitter = useEmitter();
  //   useEffect(() => {
  //     emitter.emit(event, data);
  //   }, [emitter, event, data, ...depsList]);
  // };

  return {
    emitter,
    useEmitter,
    useListenEvent,
    EmitterProvider: EmitterContext.Provider,
  };
}
