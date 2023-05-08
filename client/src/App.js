import React, { useState, useEffect } from 'react'
import {Header} from './components/Header'
import {DisplayWorkouts} from './components/DisplayWorkouts'
import { getWorkouts } from './components/api-calls/getWorkouts'
import './App.css'
import { DisplaySingleWorkoutModal } from './components/DisplaySingleWorkout'

const App = () =>{
  const [data, setData] = useState(null)
  const [showSingleWorkout, setShowSingleWorkout] = useState(false)
  const [workoutId, setWorkoutId] = useState('')

  useEffect(() => {
    getWorkouts().then(data => setData(data))
  }, [])

  const handleClose = () => {
    setShowSingleWorkout(false)
    setWorkoutId('')
  }

  return (
    <>
      <div className="main-container">
        <Header />
        {data && 
          <DisplayWorkouts 
            data={data} 
            setShowSingleWorkout={setShowSingleWorkout} 
            setWorkoutId={setWorkoutId} 
          />
        }
        {showSingleWorkout && 
          <DisplaySingleWorkoutModal 
            workoutId={workoutId}
            data={data}   
            handleClose={handleClose}
          />
        }
      </div>
    </>

  )
}

export default App