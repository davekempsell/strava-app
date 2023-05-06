export function getSingleWorkout(workoutId) {
  const apiUrl = process.env.REACT_APP_API_URL || 'https://strava-api-server.onrender.com';

  return fetch(apiUrl + workoutId)
    .then((res) => res.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.log(error)
    })
}