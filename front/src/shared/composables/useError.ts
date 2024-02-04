export function useError(_hasError: boolean, _errorMessages: string | Array<string>) {
  let hasError: boolean

  if (typeof _errorMessages === 'string') {
    hasError = _hasError || !!_errorMessages
  } else if (Array.isArray(_errorMessages)) {
    hasError = _hasError || (!!_errorMessages.length && _errorMessages[0] !== '')
  } else {
    hasError = false
  }

  let errorMessages: string

  if (typeof _errorMessages === 'string') {
    errorMessages = _errorMessages
  } else if (Array.isArray(_errorMessages) && _errorMessages.length) {
    errorMessages = _errorMessages.reduce((acc, item, index, array) => {
      return acc + item + (array.length !== index + 1 ? ', ' : '')
    })
  } else {
    errorMessages = ''
  }

  return { hasError, errorMessages }
}
