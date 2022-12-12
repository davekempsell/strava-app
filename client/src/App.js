import React, { useState, useEffect } from 'react'
import example from '../../server/example'
import ChallengeSummary from './components/ChallengeSummary'
import DisplayWorkouts from './components/DisplayWorkouts'
import { getWorkouts } from './components/api-calls/getWorkouts'

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
    <div>
      {ChallengeSummary(data)}
      {DisplayWorkouts(loading, data)}
    </div>
  )
}

export default App