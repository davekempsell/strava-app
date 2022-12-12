import React from 'react'

export default function ChallengeSummary(data) {
  if(!data){
    return (
      <div>
      <h1>
        Total Distance: Loading data...
      </h1>
      <h2>
        Distance remaining: Loading data...
      </h2>
      <h3>Days remaining: Loading data...</h3>
      <h3>Required distance per day: Loading data...</h3>
    </div>
    )
  } else {
    function totalMeters() {
      let total = 0
      data.forEach(element => {
        total += element.distance
      })
      return total / 1000
    }
    const metersCompleted = totalMeters().toFixed(2)
    const metersRemaining = 500 - totalMeters().toFixed(2)
    
    function daysLeft() {
      const today = new Date()
      const day = today.getDate()
      const latestWorkout = new Date(data[0].start_date_local)
      if(day === latestWorkout.getDate()) {
        return 22 - (day + 1)
      } else {
        return 22 - day
      }
    }
    return (
      <div>
        <h1>
          Total Distance: {metersCompleted}km
        </h1>
        <h2>
          Distance remaining: {metersRemaining}km
        </h2>
        <h3>Days remaining: {daysLeft()}</h3>
        <h3>Required distance per day: {(metersRemaining / daysLeft()).toFixed(2)}km</h3>
      </div>
    )
  }
}