import { createModel } from 'xstate/lib/model';
import { fetchService } from '@services/fetchService';

export type FetchServiceMachineContext = {
  data: any;
};
export const fetchServiceMachineModel = createModel(
  {} as FetchServiceMachineContext,
  {
    events: {
      FETCH: (url: string) => ({ url }),
    },
  }
);

export const fetchServiceMachine = fetchServiceMachineModel.createMachine(
  {
    context: fetchServiceMachineModel.initialContext,
    initial: 'idle',
    schema: {
      services: {} as {
        fetchService: {
          data: any;
        };
      },
    },
    tsTypes: {} as import('./fetchServiceMachine.typegen').Typegen0,
    states: {
      idle: {
        on: {
          FETCH: 'isFetching',
        },
      },
      isFetching: {
        invoke: {
          src: 'fetchService',
          onDone: 'isSuccess',
          onError: 'isError',
        },
      },
      isError: {
        entry: fetchServiceMachineModel.assign((_context, event) => {
          return {
            data: event.data,
          };
        }),
        on: {
          FETCH: 'isFetching',
        },
      },
      isSuccess: {
        entry: fetchServiceMachineModel.assign((_context, event) => {
          return {
            data: event.data,
          };
        }),
        on: {
          FETCH: {
            target: 'isFetching',
          },
        },
      },
    },
  },
  {
    services: {
      fetchService: async (context, event) => {
        return fetchService(event.url);
      },
    },
  }
);
