export function refreshWorkouts() {
  const apiUrl = process.env.REACT_APP_API_URL || 'https://strava-api-server.onrender.com/';

  return fetch(apiUrl + 'workout/addWorkouts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })
    .then(() => {
      return fetch(apiUrl);
    })
    .then((res) => res.json())
    .then((data) => { return data})
    .catch((error) => {
      console.log(error)
    })
}