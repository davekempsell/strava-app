import { WorkoutData } from "../../types"
import { convertToUnix } from "../filterData/filterData"

export const getSufferScoreAverages = (workouts: WorkoutData[]) => {
    const validSufferScores = workouts.filter((workout) => workout.data.suffer_score > 0 )
    let totalScore = 0

    return validSufferScores.reverse().map((workout, index) => {
      totalScore += workout.data.suffer_score
      const latestAverage = totalScore / (index + 1)

      const workoutDate = new Date(workout.data.start_date_local)
      const yy = workoutDate.getFullYear().toString().slice(-2)
      const mm = workoutDate.getMonth() + 1
      const dd = workoutDate.getDate()
      const hours = workoutDate.getHours().toString().padStart(2, '0')
      const minutes = workoutDate.getMinutes().toString().padStart(2, '0')
      const time = hours + ':' + minutes

      return {
        workout: (index + 1).toString(),
        date: `${dd}/${mm}/${yy}`,
        tooltipLabel: `${dd}/${mm}/${yy} ${time}`,
        aveSuffering: Number(latestAverage.toFixed(1)),
        sufferScore: workout.data.suffer_score
      }
    })
  }

export const getMaxSufferScore = (workouts: WorkoutData[]) => {
  const now = new Date()
  const nowUnix = now.getTime() / 1000

  const validSufferScores = workouts.filter((workout) => workout.data.suffer_score > 0 )
  const oneYearData = validSufferScores.filter((workout) => {
    return convertToUnix(workout.timestamp) > nowUnix - (86400 * 365);
  })
    const sixMonthData = validSufferScores.filter((workout) => {
    return convertToUnix(workout.timestamp) > nowUnix - (86400 * 180);
  })
    const ninetyDayData = validSufferScores.filter((workout) => {
    return convertToUnix(workout.timestamp) > nowUnix - (86400 * 365);
  })
    const thirtyDayData = validSufferScores.filter((workout) => {
    return convertToUnix(workout.timestamp) > nowUnix - (86400 * 365);
  })

  const sufferScores = [
    ...getSufferScoreAverages(oneYearData),
    ...getSufferScoreAverages(sixMonthData),
    ...getSufferScoreAverages(ninetyDayData),
    ...getSufferScoreAverages(thirtyDayData),
  ]

  const formattedSufferScores = sufferScores.map(workout => workout.aveSuffering)

  return Number(((Math.max(...formattedSufferScores)) * 1.1).toFixed(0))
}
