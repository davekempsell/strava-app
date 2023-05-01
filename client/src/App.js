import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import DisplayWorkouts from './components/DisplayWorkouts'
import { getWorkouts } from './components/api-calls/getWorkouts'
import './App.css'
import { DisplaySingleWorkoutModal } from './components/DisplaySingleWorkout'

const App = () =>{
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showSingleWorkout, setShowSingleWorkout] = useState(false)
  const [workoutId, setWorkoutId] = useState('')

  useEffect(() => {
    getWorkouts(setData, setLoading)
  },[])

  const handleClose = () => {
    setShowSingleWorkout(false)
    setWorkoutId('')
  }

  return (
    <>
      <div className="main-container">
        {Header()}
        {data && DisplayWorkouts(loading, data, setShowSingleWorkout, setWorkoutId)}
        {showSingleWorkout && <DisplaySingleWorkoutModal workoutId={workoutId} handleClose={handleClose}/>}
      </div>
    </>

  )
}

export default App