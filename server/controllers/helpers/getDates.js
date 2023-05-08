exports.getStart = () => {
  const now = new Date
  const nowUnix = Date.parse(now) / 1000
  // get the unix timestamp for two years ago
  const twoYearsAgo = nowUnix - (86400 * 730)
  return twoYearsAgo.toString()
}

exports.getNow = () => {
  const now = new Date()
  const end = now.getTime() / 1000
  return end.toString()
}

exports.convertToUnix = (dateTimeStr) => {
  const dateTime = new Date(dateTimeStr)
  const unixTimestamp = (dateTime.getTime() / 1000) - 86400
  return unixTimestamp.toString()
}