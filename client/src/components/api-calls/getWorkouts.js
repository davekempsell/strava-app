export function getWorkouts() {
  // const apiUrl = process.env.REACT_APP_API_URL || 'https://strava-api-server.onrender.com';

  // return fetch(apiUrl + '/workouts/get-workouts')
  return fetch('https://strava-api-server.onrender.com/workouts/get-workouts')
    .then((res) => res.json())
    .then((data) => { return data})
    .catch((error) => {
      console.log(error)
    })
}