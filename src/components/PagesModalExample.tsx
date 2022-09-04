import { Dialog, Transition } from '@headlessui/react';
import { pagesWithDialogMachine } from '@machines/pagesWithDialogMachine';
import { useMachine } from '@xstate/react';
import { FC, Fragment, useRef } from 'react';
import { SimpleCard } from './SimpleCard';
import classNames from 'classnames';
export type PagesModalExampleProps = {};

export const PagesModalExample: FC<PagesModalExampleProps> = () => {
  const [state, send, service] = useMachine(pagesWithDialogMachine, {
    devTools: true,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Transition
        appear
        show={
          state.matches('asking_for_answer') || state.matches('answer_is_wrong')
        }
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => send({ type: 'BACK_TO_LAST_CURRENT_PAGE' })}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    What is the sum of all the numbers?
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <input
                        defaultValue={state.context.givenAnswer}
                        onChange={(e) => {}}
                        type="number"
                        ref={inputRef}
                        className={classNames(
                          'block w-full rounded-md pr-10 sm:text-sm',
                          {
                            'border-red-900  text-red-900 placeholder-red-900 focus:border-red-900 focus:outline-none focus:ring-red-900':
                              state.context.errorMessage !== undefined,
                          }
                        )}
                        aria-invalid={state.matches('answer_is_wrong')}
                      />
                      <span className="text-red-900">
                        {state.context.errorMessage}
                      </span>
                    </form>
                  </div>

                  <div className="mt-4 float-right">
                    <button
                      type="button"
                      className="inline-flexjustify-center rounded-md border border-transparent bg-green-400 px-4 py-2 text-sm font-medium  hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() =>
                        send({
                          type: 'SUBMIT_ANSWER',
                          answer: Number(inputRef.current?.value),
                        })
                      }
                    >
                      Submit answer
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className="w-full  flex flex-row justify-center items-center px-4">
        <div className="w-10 cursor-pointer">
          {state.can('PREV') && (
            <svg
              onClick={() => send('PREV')}
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          )}
        </div>

        {!state.done ? (
          state.context.pages.map((page, index) => {
            return (
              page.number === state.context.currentPage.number && (
                <SimpleCard
                  title="Remember the numbers you see"
                  content={String(page.sumNumber)}
                  key={index}
                />
              )
            );
          })
        ) : (
          <SimpleCard
            title="Well done, the correct answer is: "
            content={String(state.context.givenAnswer)}
            subtitle="(machine flow is completed)"
          />
        )}
        <div className="w-10 cursor-pointer">
          {state.can('NEXT') && (
            <svg
              onClick={() => send('NEXT')}
              role={'button'}
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          )}

          {state.can('COMPLETE') && (
            <svg
              onClick={() => send('COMPLETE')}
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          )}
        </div>
      </div>
    </>
  );
};
