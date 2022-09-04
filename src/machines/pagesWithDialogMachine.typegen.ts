// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    validateAnswer: "done.invoke.pagesWithDialogMachine.validating:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    assignAnswer: "SUBMIT_ANSWER";
    nextPage: "NEXT";
    prevPage: "PREV";
  };
  eventsCausingServices: {
    validateAnswer: "SUBMIT_ANSWER";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "answer_is_wrong"
    | "asking_for_answer"
    | "completed"
    | "reviewing_pages"
    | "reviewing_pages.hist"
    | "reviewing_pages.page1"
    | "reviewing_pages.page2"
    | "reviewing_pages.page3"
    | "validating"
    | { reviewing_pages?: "page1" | "page2" | "page3" };
  tags: never;
}
