import { useState, useEffect, FC } from 'react'
import {Header} from './components/Header'
import {DisplayWorkouts} from './components/DisplayWorkouts'
import { getWorkouts } from './components/api-calls/getWorkouts'
import './App.css'
import { filterData } from './components/filterData/filterData'
import { DisplaySingleWorkoutModal } from './components/DisplaySingleWorkout'
import { FilterOptions } from './components/FilterOptions'
import { FilterOptionsType, WorkoutData } from './types/types'
import { Box } from './utils/components/FlexBox'
import styled from 'styled-components'
import { themes } from './utils'

const App:FC = () =>{
  const [data, setData] = useState<WorkoutData[] | null>(null)
  const [showSingleWorkout, setShowSingleWorkout] = useState(false)
  const [workoutId, setWorkoutId] = useState('')
  const [filterOption, setFilterOption] = useState<FilterOptionsType>('oneYear')

  useEffect(() => {
    getWorkouts().then(data => setData(data))
  }, [])

  const handleClose = () => {
    setShowSingleWorkout(false)
    setWorkoutId('')
  }

  const filteredData = data ? filterData(data, filterOption) : []

  return (
    <MainContainer flex direction='column'>
      <Header />
      <FilterOptions setFilterOption={setFilterOption} filterOption={filterOption}/>
      {data &&
        <DisplayWorkouts 
          data={filteredData} 
          setShowSingleWorkout={setShowSingleWorkout} 
          setWorkoutId={setWorkoutId} 
        />
      }
      {showSingleWorkout && 
        <DisplaySingleWorkoutModal 
          workoutId={workoutId}
          data={data}   
          handleClose={handleClose}
        />
      }
    </MainContainer>

  )
}

const MainContainer = styled(Box)`
  background-color: ${themes.colors.background};
`

export default App
