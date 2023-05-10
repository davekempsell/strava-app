export interface WorkoutData {
  _id: string
  workoutId: string
  data: {
    name: string
    type: string
    moving_time: number
    suffer_score: number
    average_heartrate: number
  }
  timestamp: string
}

export type FilterOptionsType = 
  | 'oneYear' 
  | 'sixMonths'
  | 'ninetyDays'
  | 'thirtyDays'