import { FilterOptionsType, WorkoutData } from "../../types";

export const calculateWeeklyWorkouts = (numberOfWorkouts: number, filterOption: FilterOptionsType) => {
  switch(filterOption) {
    case 'oneYear':
      const oneYearAverage = numberOfWorkouts / (365 / 7)
      return Number(oneYearAverage.toFixed(1));
    case 'sixMonths':
      const sixMonthsAverage = numberOfWorkouts / (180 / 7)
      return Number(sixMonthsAverage.toFixed(1));
    case 'ninetyDays':
      const ninetyDayAverage = numberOfWorkouts / (90 / 7)
      return Number(ninetyDayAverage.toFixed(1));
    case 'thirtyDays':
      const thirtyDayAverage = numberOfWorkouts / (30 / 7)
      return Number(thirtyDayAverage.toFixed(1));
    default:
      return 0;
  }
}

export const calculateAverageDuration = (data: WorkoutData[]): string => {
  const totalMovingTime = data.reduce((sum, workoutData) => sum + workoutData.data.moving_time, 0);
  const averageMovingTime = totalMovingTime / data.length;

  const durationHours =  Math.floor(averageMovingTime / 3600)
  const durationMinutes = Math.floor(averageMovingTime / 60) % 60
  const durationSeconds = Math.floor(averageMovingTime) % 60

  const duration = durationHours > 0
    ? `${durationHours}h ${durationMinutes}m`
    : `${durationMinutes}m ${durationSeconds}s`

  return duration
}

export const calculateAverageSufferScore = (data: WorkoutData[]) => {
  const validSufferScores = data.filter((workout) => workout.data.suffer_score > 0 )
  const totalSufferScore = validSufferScores.reduce((sum, workoutData) => sum + workoutData.data.suffer_score, 0);
  const averageSufferScore = totalSufferScore / validSufferScores.length;
  
  return Number(averageSufferScore.toFixed(1))
}