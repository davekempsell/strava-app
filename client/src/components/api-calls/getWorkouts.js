import React from 'react'

export function getWorkouts(setData, setLoading) {
  fetch('http://localhost:5050/test')
    .then((res) => res.json())
    .then((data) => {
      setData(data)
      setLoading(false)
    })
    .catch((error) => {
      console.log(error)
      setData('error loading data')
    })
}