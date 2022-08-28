import { createModel } from 'xstate/lib/model';

export type TogglingModalContext = {
  modalOpen: boolean;
};

export const togglingModalMachineModel = createModel(
  {
    modalOpen: false,
  } as TogglingModalContext,
  {
    events: {
      OPEN_MODAL: () => ({}),
      CLOSE_MODAL: () => ({}),
    },
  }
);

export const togglingModalMachine = togglingModalMachineModel.createMachine({
  context: togglingModalMachineModel.initialContext,
  tsTypes: {} as import('./togglingModalMachine.typegen').Typegen0,
  id: 'togglingModal',
  initial: 'idle',
  states: {
    idle: {
      on: {
        OPEN_MODAL: {
          actions: togglingModalMachineModel.assign(() => ({
            modalOpen: true,
          })),
          target: 'modal_opened',
        },
      },
    },
    modal_opened: {
      on: {
        CLOSE_MODAL: {
          actions: togglingModalMachineModel.assign(() => ({
            modalOpen: false,
          })),
          target: 'idle',
        },
      },
    },
  },
});
