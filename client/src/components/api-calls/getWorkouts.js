
export function getWorkouts(setData, setLoading) {
  fetch('https://strava-api-server.onrender.com')
  // fetch('http://localhost:5050/')
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