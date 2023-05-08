import React from 'react'

import './DisplayWorkouts.css'
import { WorkoutCard } from './WorkoutCard'

export const DisplayWorkouts = ({data, setShowSingleWorkout, setWorkoutId}) => {

  if(!data) return null

  if(data) return (
    <div className="display-workouts-container">
      <h2>Completed Workouts:</h2>
      <div className="workout-cards-container">
        {data.map((element) => {
          return WorkoutCard(element, setShowSingleWorkout, setWorkoutId)
        })}
      </div>
    </div>
  )
}