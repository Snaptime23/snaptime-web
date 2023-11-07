import { createReactEmitter } from './createReactEmitter.ts';

interface AppEvents {
  foo: string;
}

export const { emitter, useEmitter, EmitterProvider, useListenEvent } = createReactEmitter<AppEvents>();
