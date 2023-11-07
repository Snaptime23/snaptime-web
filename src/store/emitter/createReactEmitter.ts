import EventEmitter from 'eventemitter3';
import { createContext, useContext } from 'react';

type EventHandlers<T> = {
  [K in keyof T]: (event: T[K]) => void | Promise<void>;
};

export function createReactEmitter<Events>() {
  const emitter = new EventEmitter<EventHandlers<Events>, never>();
  const EmitterContext = createContext(emitter);
  const useEmitter = () => useContext(EmitterContext);
  return {
    emitter,
    useEmitter,
    EmitterProvider: EmitterContext.Provider,
  };
}
