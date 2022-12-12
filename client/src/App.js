import React, { useState, useEffect } from 'react'
import example from '../../server/example'
import Header from './components/Header'
import ChallengeSummary from './components/ChallengeSummary'
import DisplayWorkouts from './components/DisplayWorkouts'
import { getWorkouts } from './components/api-calls/getWorkouts'
import css from './App.css'

const App = () =>{
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  // For testing
  // useEffect(() => {
  //   setData(example)
  //   setLoading(false)
  // }, [])

  // Real API call
  useEffect(() => {
    getWorkouts(setData, setLoading)
  },[])

  return (
    <div className="main-container">
      {Header()}
      {ChallengeSummary(data)}
      {DisplayWorkouts(loading, data)}
    </div>
  )
}

export default App