export interface WorkoutData {
  _id: string
  workoutId: string
  data: {
    name: string
    type: string
  }
  timestamp: string
}

export type FilterOptionsType = 
  | 'oneYear' 
  | 'sixMonths'
  | 'ninetyDays'
  | 'thirtyDays'