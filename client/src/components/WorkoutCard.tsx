import { FC } from "react"
import { WorkoutData } from "../types"
import { Box, themes } from "../utils"
import styled from "styled-components"

interface Props {
  workout: WorkoutData
  setShowSingleWorkout: (showSingleWorkout: boolean) => void
  setWorkoutId: (workoutId: string) => void
}

export const WorkoutCard:FC<Props> = ({workout, setShowSingleWorkout, setWorkoutId}) => {
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
      <WorkoutCardContainer 
        key={workout.workoutId} 
        onClick={() => handleClick()}
        flex
        direction="column"
        wrap='wrap'
        justifyContent="center"
        width='90%'
        maxWidth="320px"

      >
        <h3>{workoutName}</h3>
        <DateAndTypeWrapper flex justifyContent="space-around" px='16px'>
          <p>{`${dd}/${mm}/${yyyy}`}</p>
          <p>{activityType}</p>
        </DateAndTypeWrapper>
      </WorkoutCardContainer>
    )
  }

  const WorkoutCardContainer = styled(Box)`
    background-color: white;
    color: black;
    border-radius: 20px;
    opacity: 90%;
    transition: all 300ms ease-in-out;

    :hover {
      opacity: 100%;
      cursor: pointer;
    }

    h3 {
      margin: 1rem 0 0 0;
      padding: 0 1rem;
    }
  `

  const DateAndTypeWrapper = styled(Box)`
    padding: 0rem 1rem;
    font-weight: bold;
    color: ${themes.colors.orange};
  `