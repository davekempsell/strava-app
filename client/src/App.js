import React, { useState, useEffect } from 'react'

const App = () =>{

  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5050/')
      .then((res) => res.json())
      .then((data) => setData(data))
  })

  return (
    <h1>
      {!data ? 'Loading... ' : data}
    </h1>
  )
}

export default App