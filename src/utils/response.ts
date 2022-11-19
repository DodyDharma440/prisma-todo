export const createSuccessResponse = <T>(data: T, status?: number) => {
  return {
    status: status || 200,
    data,
    ok: true,
    message: "Success",
  };
};

export const createErrResponse = <E extends Error>(error: E, status: number) => {
  return {
    status,
    error,
    ok: false,
    message: "Error"
  }
}