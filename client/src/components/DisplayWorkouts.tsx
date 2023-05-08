import { FC } from 'react'

import { WorkoutCard } from './WorkoutCard'
import { WorkoutData } from '../types/types'
import { Box } from '../utils/components/FlexBox'
import styled from 'styled-components'
import { themes } from '../utils'

interface Props {
  data: WorkoutData[]
  setShowSingleWorkout: (showSingleWorkout: boolean) => void
  setWorkoutId: (workoutId: string) => void
}

export const DisplayWorkouts:FC<Props> = ({data, setShowSingleWorkout, setWorkoutId}) => {

  if(!data) return (
    <WorkoutsContainer 
      flex 
      width='100%'
      alignItems='center'
      justifyContent='center'
      wrap='wrap'
      gap='32px'
      py='32px'
      px='16px'
      height='100%'
    />
  )

  return (
    <StyledBox flex direction='column'>
      <h1>Workouts</h1>
      <WorkoutsContainer 
        flex 
        width='100%'
        justifyContent='center'
        alignContent='flex-start'
        wrap='wrap'
        gap='32px'
        py='32px'
        px='16px'
      >
        {data.map((workout, index) => {
          return <WorkoutCard
            key={'workoutCard' + index}
            workout={workout} 
            setShowSingleWorkout={setShowSingleWorkout} 
            setWorkoutId={setWorkoutId} 
          />
        })}
      </WorkoutsContainer>
    </StyledBox>

  )
}

const StyledBox = styled(Box)`
  background-color: ${themes.colors.orange};
  color: white;
  text-align: center;
`

const WorkoutsContainer = styled(Box)`
  background-color: ${themes.colors.orange};
  color: white;
  text-align: center;
  min-height: 100vh;  
`