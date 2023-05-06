
export function getWorkouts(setData, setLoading) {
  const apiUrl = process.env.REACT_APP_API_URL || 'https://strava-api-server.onrender.com';

  fetch(apiUrl)
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