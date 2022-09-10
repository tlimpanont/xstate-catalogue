import { createMachine, send } from 'xstate';
import { respond } from 'xstate/lib/actions';

const authServerMachine = createMachine({
  initial: 'waitingForCode',
  states: {
    waitingForCode: {
      on: {
        CODE: {
          actions: respond({ type: 'TOKEN' }, { delay: 3000 }),
        },
      },
    },
  },
});
export const authClientMachine = createMachine({
  initial: 'idle',
  tsTypes: {} as import('./simpleAuthMachine.typegen').Typegen0,
  states: {
    idle: {
      on: {
        AUTH: { target: 'authorizing' },
      },
    },
    authorizing: {
      invoke: {
        id: 'auth-server',
        src: authServerMachine,
      },
      entry: send('CODE', { to: 'auth-server' }),
      on: {
        TOKEN: { target: 'authorized' },
      },
    },
    authorized: {
      type: 'final',
    },
  },
});
