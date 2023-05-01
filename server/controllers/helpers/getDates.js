exports.getStart =() => {
  const now = new Date
  const month = now.getMonth()
  const year = now.getFullYear()
  const startDate = new Date(2020, month, 1)
  const start = Date.parse(startDate) / 1000
  return start.toString()
}

exports.getEnd = () => {
  const now = new Date
  const month = now.getMonth()
  const year = now.getFullYear()
  const endDate = new Date(year, month + 1, 1)
  const end = Date.parse(endDate) / 1000
  return end.toString()
}