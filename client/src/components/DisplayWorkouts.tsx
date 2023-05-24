import { FC } from 'react'

import { WorkoutCard } from './WorkoutCard/WorkoutCard'
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
    <DisplayWorkoutsWrapper flex direction='column' alignItems='center'>
      <h2>Workouts</h2>
      <WorkoutsContainer 
        flex
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
    </DisplayWorkoutsWrapper>

  )
}

const DisplayWorkoutsWrapper = styled(Box)`
  background-color: ${themes.colors.tertiary};
  color: ${themes.colors.text};
  border-top: 1px solid ${themes.colors.secondary};
`

const WorkoutsContainer = styled(Box)`
  background-color: ${themes.colors.tertiary};
  min-height: 100vh;  
`