import { assign, createMachine, send } from 'xstate';
import { pure, sendParent } from 'xstate/lib/actions';

const authServerMachine = createMachine(
  {
    initial: 'waitingForCode',
    schema: {
      services: {} as {
        getToken: {
          data: string;
        };
      },
    },
    states: {
      waitingForCode: {
        on: {
          CODE: {
            target: 'gettingToken',
          },
        },
      },
      gettingToken: {
        invoke: {
          src: 'getToken',
          onDone: 'success',
          onError: 'failure',
        },
      },
      failure: {},
      success: {
        entry: pure((context, event) => {
          return sendParent(
            { type: 'TOKEN', token: event.data },
            { delay: 1500 }
          );
        }),
      },
    },
  },
  {
    services: {
      getToken: async () => {
        const token = await fetch(
          'https://www.uuidgenerator.net/api/version4'
        ).then((res) => res.text());
        return token;
      },
    },
  }
);
export const authClientMachine = createMachine({
  context: {
    token: '',
  },
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
        TOKEN: {
          target: 'idle',
          actions: assign((context, event) => {
            return { token: event.token };
          }),
        },
      },
    },
  },
});
