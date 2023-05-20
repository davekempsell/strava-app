export interface WorkoutData {
  _id: string
  workoutId: string
  data: {
    id: number
    name: string
    type: string
    moving_time: number
    suffer_score: number
    average_heartrate: number
    start_date_local: string
    distance: number
    average_watts: number
  }
  timestamp: string
}

export type FilterOptionsType = 
  | 'oneYear' 
  | 'sixMonths'
  | 'ninetyDays'
  | 'thirtyDays'