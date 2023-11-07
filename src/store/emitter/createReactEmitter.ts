import EventEmitter from 'eventemitter3';
import { createContext, useContext, useEffect } from 'react';

type EventHandlers<T> = {
  [K in keyof T]: (event: T[K]) => void | Promise<void>;
};

export function createReactEmitter<Events>() {
  const emitter = new EventEmitter<EventHandlers<Events>, never>();
  const EmitterContext = createContext(emitter);
  const useEmitter = () => useContext(EmitterContext);

  const useListenEvent: (...args: Parameters<typeof emitter.addListener>) => void = (event, listener) => {
    const emitter = useEmitter();
    useEffect(() => {
      emitter.addListener(event, listener);
      return () => {
        emitter.removeListener(event, listener);
      };
    }, [emitter, event, listener]);
  };

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
