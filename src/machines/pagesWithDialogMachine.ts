import { createModel } from 'xstate/lib/model';

export type Page = {
  number: number;
  sumNumber?: number;
};
export type PagesWithDialogMachineContext = {
  currentPage: Page;
  pages: Page[];
  errorMessage?: string;
  givenAnswer?: number;
};

const pages: Page[] = [
  {
    number: 1,
    sumNumber: Math.floor(Math.random() * 10),
  },
  {
    number: 2,
    sumNumber: Math.floor(Math.random() * 10),
  },
  {
    number: 3,
    sumNumber: Math.floor(Math.random() * 10),
  },
];

export const pagesWithDialogMachineModel = createModel(
  {
    currentPage: pages[0],
    pages,
  } as PagesWithDialogMachineContext,
  {
    events: {
      NEXT: () => ({}),
      PREV: () => ({}),
      SUBMIT_ANSWER: (answer: number) => ({ answer }),
      COMPLETE: () => ({}),
      BACK_TO_LAST_CURRENT_PAGE: () => ({}),
    },
  }
);

export const pagesWithDialogMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAcCGNYHUCWAXAFgCLaoA2A9lALKoDG+2AdmAHQBOYAbtmAO5NQA+mgwsRYAIwBiAHIBRABoAVRCnKw82co1UgAHogkBOCSwBMAZgAcZqwHYALFasWjduwDYANCACeiMwBWKxYHVwsPAAZApwk7SI8AX0SfcSw8IhIKajoGZnYuHn5GITSxdDAzWUUVJBBkdU1tXQMEB0sWCQdgsyMzKKN7Ix9-BH7IliNwqJirOITk1Ir0gmIyShp6JlYObj4BYWXymCqABQAlOQA1XQaNXC0dOtbjU0sbeycXN08RwztTA47GZItEPPYLJF7It6sscKsshtctsCntiqUjuILFILtdbo0Hs1noh2hZOt0bH0BkM-gg4mS3CCwRCoXYYWl4Zl1jktvldkUDmUsVIAMIAeSopwAMnIlHJ8fdHi1EEYoZNAkYPBI4h4wpZhn4ApEjOYpnErN0nHZghZ2XCMmtsps8qxULAANYHABm5DYglQjFgvDAbCkAGUAKoAISoAEklIIAIIyMOYOTnBVNJ6gF5mMIsC2qjzBNxGBweCy0swSEISPNOQJ2KYWQJmOy2lKwjCcx1I3muj3e33+wPB0NRxMigDSgiUYsEUsTYYTYalscI8rqdyzyrpkXik1VzhmFYkHm8hrpGpYFfsTcCgQ8jhrDjt3YdiJ5LpYnDI2AgqAPCUUgQNorBMJw5DuqwHIftyzoor+pD-oBAgIBB5C0Kh2gANqRAAupmhLZvoiCtrSwQhEWAIxMakQWEEb5wD2n4IfkSEoUBUBSCGbC+mIpCAT6bAALbHMxcFOsi7F-gBXHoYwkFYcReGEVuBJKsSdJ5mShYJCWTblpWl5WCagwuJRbjGB4UxMSsXJSf2LABkGIaCNgsCCLwfHAZGMbxkmKZphm6mKkSOaGDpBYOEWBllhWtISBYdiTACThOAxcwxcknaMOQEBwLc9oIvB0k7IU+wlIcogMLAuBEZpEUIMCVZRDeXS0VYxpAg+SSdrBJWOd+-KVRiojiBIDXhaRCAmOYgRJTq2o2RqgSJX0N79EE7QAvYcR2SxpVOSN6LVXA4lmFNJGtAxEzzI2C2OPYj7rYEnRbTEbY1gCbL9cVDl9sNFWnUKFQWFdu4PmYLD7l1Wq2B4eaRGYiVWG9vTuF0kQSKCmrggdkmAyiJ2CssENaU4tJGCaGUAiYMXxBlBODUT+Rup6VXCSOrlsOTTU44EZJRHDi2ZcZozVtDiPGNEMWWBqNjMwDX6IbJqElHzM0dQ4MPahaFjavEVjgolxqhO4mU1i4WpOErvYq2zo5uR5Xk+VAmutEe6qaobuoMa4VOmMWkQxZCrzJUYgR26xZUsLQ5AicgpBgLgkAe2Rdi0haKXOIMDhJQ45aBCH0dHS66djA4qM5YkQA */
  pagesWithDialogMachineModel.createMachine(
    {
      context: pagesWithDialogMachineModel.initialContext,
      tsTypes: {} as import('./pagesWithDialogMachine.typegen').Typegen0,
      schema: {
        services: {} as {
          validateAnswer: {
            data: boolean;
          };
        },
      },
      predictableActionArguments: true,
      initial: 'reviewing_pages',
      id: 'pagesWithDialogMachine',
      states: {
        reviewing_pages: {
          id: 'reviewing_pages',
          initial: 'page1',
          states: {
            hist: {
              history: false,
              type: 'history',
            },
            page1: {
              on: {
                NEXT: {
                  actions: 'nextPage',
                  target: 'page2',
                },
              },
            },
            page2: {
              on: {
                NEXT: {
                  actions: 'nextPage',
                  target: 'page3',
                },
                PREV: {
                  actions: 'prevPage',
                  target: 'page1',
                },
              },
            },
            page3: {
              description: 'last page where you have to do the sum math',
              on: {
                PREV: {
                  actions: 'prevPage',
                  target: 'page2',
                },
                COMPLETE: {
                  target: '#pagesWithDialogMachine.asking_for_answer',
                },
              },
            },
          },
        },
        asking_for_answer: {
          on: {
            SUBMIT_ANSWER: {
              target: 'validating',
              actions: 'assignAnswer',
            },
            BACK_TO_LAST_CURRENT_PAGE: {
              target: '#reviewing_pages.hist',
            },
          },
        },
        validating: {
          invoke: {
            src: 'validateAnswer',
            onDone: 'completed',
            onError: [
              {
                target: 'answer_is_wrong',
              },
            ],
          },
        },
        answer_is_wrong: {
          always: {
            target: 'asking_for_answer',
            actions: pagesWithDialogMachineModel.assign((_, event) => {
              return {
                errorMessage: 'wrong answer',
              };
            }),
          },
        },
        completed: {
          type: 'final',
        },
      },
    },
    {
      services: {
        validateAnswer: (context, event) => {
          return new Promise((resolve, reject) => {
            const sum = context.pages.reduce((acc, page) => {
              return acc + page.sumNumber;
            }, 0);

            if (event.answer === sum) {
              resolve(true);
            } else {
              reject(false);
            }
          });
        },
      },
      actions: {
        assignAnswer: pagesWithDialogMachineModel.assign((_, event) => {
          return {
            givenAnswer: event.answer,
          };
        }),
        nextPage: pagesWithDialogMachineModel.assign({
          currentPage: (context) => {
            const index = context.pages.findIndex(
              (page) => page.number === context.currentPage.number
            );
            return context.pages[index + 1];
          },
        }),
        prevPage: pagesWithDialogMachineModel.assign({
          currentPage: (context) => {
            const index = context.pages.findIndex(
              (page) => page.number === context.currentPage.number
            );
            return context.pages[index - 1];
          },
        }),
      },
    }
  );
