import { createReactEmitter } from './createReactEmitter.ts';

interface AppEvents {
  openSnackbar: { severity: 'success' | 'error' | 'warning' | 'info'; message: string };
}

export const { emitter, useEmitter, EmitterProvider, useListenEvent } = createReactEmitter<AppEvents>();
