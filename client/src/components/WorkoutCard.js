export const WorkoutCard = (workout, setShowSingleWorkout, setWorkoutId) => {
    const newDate = new Date(workout.start_date_local)
    const yyyy = newDate.getFullYear()
    const mm = newDate.getMonth() + 1
    const dd = newDate.getDate()

    const workoutName = workout.name.length > 30 
      ? workout.name.slice(0,30) + '...' 
      : workout.name

    const activityType = workout.type

    const handleClick = () => {
      setWorkoutId(workout.id)
      setShowSingleWorkout(true)
    }

    return (
      <div className="workout-card" key={workout.id} onClick={() => handleClick()}>
        <h3>{workoutName}</h3>
        <div className="date-and-type">
          <p>{`${dd}/${mm}/${yyyy}`}</p>
          <p>{activityType}</p>
        </div>
      </div>
    )
  }