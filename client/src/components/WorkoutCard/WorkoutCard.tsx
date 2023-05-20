import { FC } from "react"
import { WorkoutData } from "../../types"
import { Box, themes } from "../../utils"
import styled from "styled-components"
import { ActivityIcon } from "./ActivityIcon"

interface Props {
  workout: WorkoutData
  setShowSingleWorkout: (showSingleWorkout: boolean) => void
  setWorkoutId: (workoutId: string) => void
}

export const WorkoutCard:FC<Props> = ({workout, setShowSingleWorkout, setWorkoutId}) => {
    const workoutDate = new Date(workout.timestamp)
    const yyyy = workoutDate.getFullYear()
    const mm = workoutDate.getMonth() + 1
    const dd = workoutDate.getDate()
    const hours = workoutDate.getHours().toString().padStart(2, '0')
    const minutes = workoutDate.getMinutes().toString().padStart(2, '0')
    const time = hours + ':' + minutes

    const workoutName = workout.data.name.length > 30 
      ? workout.data.name.slice(0,30) + '...' 
      : workout.data.name

    const activityType = workout.data.type

    const sufferScore = workout.data.suffer_score 
      ? workout.data.suffer_score
      : 0

    const durationHours =  Math.floor(workout.data.moving_time / 3600)
    const durationMinutes = Math.floor(workout.data.moving_time / 60) % 60
    const durationSeconds = Math.floor(workout.data.moving_time) % 60

    const duration = durationHours > 0
      ? `${durationHours}h ${durationMinutes}m`
      : `${durationMinutes}m ${durationSeconds}s`
    
    const aveHr = workout.data.average_heartrate ?? 0
    const displayAveHr =  aveHr ? `${aveHr.toFixed(0)}bpm` : 'N/A'

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
        justifyContent="flex-start"
        width='320px'
        p='16px'
      >
        <DateWrapper flex>
          <p>{`${dd}/${mm}/${yyyy}`} at {time}</p>
        </DateWrapper>
        <Box flex mt='16px' gap='16px' height='44px'>
          <ActivityIcon activityType={activityType}/>
          <h3>{workoutName}</h3>
        </Box>
        <Box flex justifyContent="flex-start" mt='16px' gap='16px' pl='32px'>
          <StatWrapper flex>
            <p>Duration</p>
            <p>{duration}</p>
          </StatWrapper>
          <StatWrapper flex>
            <p>Ave. HR</p>
            <p>{displayAveHr}</p>
          </StatWrapper>
          <StatWrapper flex>
            <p>Suffer Score</p>
            <p>{sufferScore.toString()}</p>
          </StatWrapper>
        </Box>
      </WorkoutCardContainer>
    )
  }

  const WorkoutCardContainer = styled(Box)`
    background-color: ${themes.colors.background};
    color: ${themes.colors.text};

    :hover {
      cursor: pointer;
    }

    h3 {
      margin: 0;
    }
  `

  const DateWrapper = styled(Box)`
    color: ${themes.colors.darkText};
    p {
      margin: 0;
    }
  `

  const StatWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-right: 16px;
    width: auto;

    p {
      margin: 0;
      color: ${themes.colors.text};
      font-size: 16px;
    }

    p:first-child {
      font-size: 12px;
      color: ${themes.colors.darkText};
    }

    &:not(:last-child) {
      border-right: 1px solid ${themes.colors.secondary};
    }

    &:last-child {
      padding: 0;
    }

  `