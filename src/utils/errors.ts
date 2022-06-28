export const getErrorMessages = (errors: Record<string, unknown>): string => {
  let message = ''
  Object.values(errors).map(val => (message += val))
  return message
}
