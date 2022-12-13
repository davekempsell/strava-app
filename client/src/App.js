import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import ChallengeSummary from './components/ChallengeSummary'
import DisplayWorkouts from './components/DisplayWorkouts'
import { getWorkouts } from './components/api-calls/getWorkouts'
import './App.css'

const App = () =>{
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

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