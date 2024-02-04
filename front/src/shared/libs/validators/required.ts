export const getIsRequiredError = (value: any) => {
  return (
    (!value && value !== 0) || (value && value.length === 0) || String(value).trim().length === 0
  )
}

export const required = (value: any) => {
  if (getIsRequiredError(value)) {
    return 'Поле обязательно для заполнения'
  }
  return true
}
