/**
 * The request lifecycle every fetching store shares: idle → loading → success | error.
 */
export const idleRequestState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null,
};

export const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Something went wrong';
