import React from 'react'
import './ChallengeSummary.css'

export default function ChallengeSummary(data) {

  function totalMeters() {
    let total = 0
    data.forEach(element => {
      total += element.distance
    })
    return total / 1000
  }

  function daysInMonth() {
    const now = new Date()
    const month = now.getMonth()
    const year = now.getFullYear()

    const days = new Date(year, month, 0)
    return days.getDate()
  }
  
  function daysLeft() {
    if(!data){
      return 'Loading...'
    }
    const days = daysInMonth()
    const today = new Date()
    const day = today.getDate()
    const latestWorkout = new Date(data[0].start_date_local)
    if(day === latestWorkout.getDate()) {
      return days - (day + 1)
    } else {
      return days - day
    }
  }

  const metersCompleted = !data ? 'Loading...' : `${totalMeters().toFixed(2)}km`
  const metersRemaining = !data ? 'Loading...' : `${(500 - totalMeters()).toFixed(2)}km`
  const dailyKm = !data ? 'Loading...' : `${((500 - totalMeters()) / daysLeft()).toFixed(2)}km`

  return (
    <div className="summary-container">
      <h2>Monthly Target: 500km</h2>
      <h3>
        Total Distance: {metersCompleted}
      </h3>
      <h3>
        Distance remaining: {metersRemaining}
      </h3>
      <div className="needed-container">
        <div className="needed-wrapper">
          <h2>{daysLeft()}</h2>
          <h4>Days left</h4>
        </div>
        <div className="needed-wrapper">
          <h2>{dailyKm}</h2>
          <h4>Km/day needed</h4>
        </div>
      </div>
    </div>
  )
  
}