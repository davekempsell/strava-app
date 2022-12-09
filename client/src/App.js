import React, { useState, useEffect } from 'react'

const App = () =>{

  const [data, setData] = useState(null)
  const [total, setTotal] = useState(0)

  function totalMeters(data) {
    let total = 0
    data.forEach(element => {
      total += element.distance
    })
    return total / 1000
  }

  useEffect(() => {
    fetch('http://localhost:5050/')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setTotal(totalMeters(data))
      })
      .catch((error) => {
        console.log(error)
        setData('error loading data')
      })
  },[])



  return (
    <div>
      <h1>
        Total Distance: {total.toFixed(2)}km
      </h1>
      <h2>
        Distance remaining: {500 - total.toFixed(2)}km
      </h2>
    </div>
  )
}

export default App