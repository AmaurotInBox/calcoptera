export function getSizeFromProps(size: string | number, prefix: string = 'px') {
  if (typeof size === 'string') {
    return size
  } else if (typeof size === 'number') {
    return `${size}${prefix}`
  } else {
    return '0'
  }
}
