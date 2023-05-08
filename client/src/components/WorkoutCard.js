export const WorkoutCard = (workout, setShowSingleWorkout, setWorkoutId) => {
    const newDate = new Date(workout.timestamp)
    const yyyy = newDate.getFullYear()
    const mm = newDate.getMonth() + 1
    const dd = newDate.getDate()

    const workoutName = workout.data.name.length > 30 
      ? workout.data.name.slice(0,30) + '...' 
      : workout.data.name

    const activityType = workout.data.type

    const handleClick = () => {
      setWorkoutId(workout.workoutId)
      setShowSingleWorkout(true)
    }

    return (
      <div className="workout-card" key={workout.workoutId} onClick={() => handleClick()}>
        <h3>{workoutName}</h3>
        <div className="date-and-type">
          <p>{`${dd}/${mm}/${yyyy}`}</p>
          <p>{activityType}</p>
        </div>
      </div>
    )
  }