export function getSingleWorkout(workoutId) {
  // fetch('https://strava-api-server.onrender.com')
  return fetch(`http://localhost:5050/${workoutId}`)
    .then((res) => res.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.log(error)
    })
}