import { createReactEmitter } from './createReactEmitter.ts';

interface AppEvents {
  foo: string;
}

const { emitter, useEmitter, EmitterProvider } = createReactEmitter<AppEvents>();

export { EmitterProvider, emitter, useEmitter };
