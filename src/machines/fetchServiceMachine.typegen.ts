// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.(machine).isFetching:invocation[0]": {
      type: "done.invoke.(machine).isFetching:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.(machine).isFetching:invocation[0]": {
      type: "error.platform.(machine).isFetching:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    fetchService: "done.invoke.(machine).isFetching:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {};
  eventsCausingServices: {
    fetchService: "FETCH";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: "idle" | "isError" | "isFetching" | "isSuccess";
  tags: never;
}
