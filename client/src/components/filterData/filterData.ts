import { FilterOptionsType, WorkoutData } from "../../types"

export const convertToUnix = (dateTimeStr: string) => {
  const dateTime = new Date(dateTimeStr)
  const unixTimestamp = dateTime.getTime() / 1000

  return unixTimestamp
}

export const filterData = (data: WorkoutData[], filterOption: FilterOptionsType) => {
  const now = new Date()
  const nowUnix = now.getTime() / 1000

  const getFilterOptionUnix = () => {
    switch(filterOption) {
      case 'oneYear':
        return nowUnix - (86400 * 365);
      case 'sixMonths':
        return nowUnix - (86400 * 180);
      case 'ninetyDays':
        return nowUnix - (86400 * 90);
      case 'thirtyDays':
        return nowUnix - (86400 * 30);
      default:
        return nowUnix;
    }
  }

  const filteredData = data.filter((workout) => {
    return convertToUnix(workout.timestamp) > getFilterOptionUnix()
  })

  return filteredData
}
