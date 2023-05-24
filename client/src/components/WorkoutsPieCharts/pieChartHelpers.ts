import { WorkoutData } from "../../types";
import { hexToRGBA } from "../../utils/helpers/general";

export const getWorkoutTypes = (data: WorkoutData[]) => {
  const types = data.map(workout => workout.data.type)

  let workoutTypes: { [key: string]: number} = {}

  types.forEach(type => {
    if(workoutTypes[type]) {
      workoutTypes[type]++
    } else {
      workoutTypes[type] = 1
    }
  })

  const chartData = Object.entries(workoutTypes).map(([type, value]) => ({type, value}))

  return chartData
}

const order = [
  '0-10 minutes',
  '10-20 minutes',
  '20-30 minutes',
  '30-40 minutes',
  '40-50 minutes',
  '50-60 minutes',
  '60+ minutes',
  '90+ minutes',
  '120+ minutes',
];

export const getWorkoutDurations = (data: WorkoutData[]) => {
  const workoutDurations = data.map(workout => {
    switch(true) {
      case (workout.data.moving_time <= 600):
        return '0-10 minutes';
      case (workout.data.moving_time <= 1200):
        return '10-20 minutes';
      case (workout.data.moving_time <= 1800):
        return '20-30 minutes';
      case (workout.data.moving_time <= 2400):
        return '30-40 minutes';
      case (workout.data.moving_time <= 3000):
        return '40-50 minutes';
      case (workout.data.moving_time <= 3600):
        return '50-60 minutes';
      case (workout.data.moving_time > 7200):
        return '120+ minutes'
      case (workout.data.moving_time > 5400):
        return '90+ minutes'
      case (workout.data.moving_time > 3600):
        return '60+ minutes'
      default:
        return 'no time recorded'
    }
  })
    
  let durations: { [key: string]: number} = {}

  workoutDurations.forEach(duration => {
    if(durations[duration]) {
      durations[duration]++
    } else {
      durations[duration] = 1
    }
  })

  const chartData = order.map(duration => ({
    duration,
    value: durations[duration] || 0,
  }));

  return chartData
}

export const getColors = (data: WorkoutData[], color: string) => {
  const workouts = getWorkoutDurations(data)
  const colors = workouts.map((workout, index) => {
    const opacity = (1 / workouts.length) * (index + 1);
    return hexToRGBA(color, opacity)
  })

  return colors
}