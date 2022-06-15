export function formatDate(date: string) {
  let formatDate = date.split("-").reverse().join("/")
  return formatDate
}

export function getUTCDate(date: string) {
  const utc = new Date(date).toUTCString()
  return utc
}
