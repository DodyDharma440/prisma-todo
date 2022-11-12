export const createSuccessResponse = <T>(data: T, status?: number) => {
  return {
    status: status || 200,
    data,
    ok: true,
    message: "Success",
  };
};
