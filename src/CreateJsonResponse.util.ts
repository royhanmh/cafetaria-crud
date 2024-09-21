export interface JsonResponse<T = any> {
  // <T> allows the data to be of any type (e.g., User)
  success: boolean;
  message: string;
  statusCode: number;
  data?: T; // The data will now be of type T, which can be User, array of Users, etc.
}

export const createJsonResponse = <T>(
  success: boolean,
  message: string,
  statusCode: number,
  data?: T,
): JsonResponse<T> => {
  return {
    success,
    message,
    statusCode,
    data: data || null, // return `null` if no data is provided
  };
};
