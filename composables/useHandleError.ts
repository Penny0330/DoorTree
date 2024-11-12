export function useHandleError() {
  const handleError = (
    statusCode: number,
    statusMessage: string,
    fatal = true,
  ) => {
    throw showError({ statusCode, statusMessage, fatal })
  }

  return {
    handleError,
  }
}
