
export function getWorkouts(setData, setLoading) {
  fetch('https://strava-api-server.onrender.com')
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