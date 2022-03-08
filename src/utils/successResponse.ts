import { Todos } from '../types/todos';

export const successResponseBody = (
  message: string,
  responseData: Todos | null | [Todos]
): object => {
  return {
    success: true,
    message: message,
    data: responseData,
  };
};
