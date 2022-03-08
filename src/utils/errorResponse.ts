export const errorResponseBody = (message: string): object => {
  return {
    success: false,
    message: message,
    data: null,
  };
};
