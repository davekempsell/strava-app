import React from 'react'

import './DisplayWorkouts.css'
import { WorkoutCard } from './WorkoutCard'

export default function DisplayWorkouts(loading, data, setShowSingleWorkout, setWorkoutId) {

  if(loading) return (
    <div className="display-workouts-container">
      <p>Loading...</p>
    </div>
  )

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