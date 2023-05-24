import { useState, useEffect, FC } from 'react'
import {Header} from './components/Header'
import {DisplayWorkouts} from './components/DisplayWorkouts'
import { getWorkouts } from './components/api-calls/getWorkouts'
import './App.css'
import { filterData } from './components/filterData/filterData'
import { SingleWorkoutModal } from './components/SingleWorkoutModal'
import { FilterOptions } from './components/FilterOptions'
import { FilterOptionsType, WorkoutData } from './types/types'
import { Box } from './utils/components/FlexBox'
import styled from 'styled-components'
import { themes } from './utils'
import { DataDisplay } from './components/DataDisplay/DataDisplay'
import { SufferScoreChart } from './components/SufferScoreChart/SufferScoreChart'
import { getMaxSufferScore } from './components/SufferScoreChart/sufferScoreHelpers'
import { WorkoutsPieCharts } from './components/WorkoutsPieCharts/WorkoutsPieCharts'

const App:FC = () =>{
  const [data, setData] = useState<WorkoutData[] | null>(null)
  const [showSingleWorkout, setShowSingleWorkout] = useState(false)
  const [singleWorkoutData, setSingleWorkoutData] = useState<WorkoutData['data'] | null>(null)
  const [workoutId, setWorkoutId] = useState('')
  const [filterOption, setFilterOption] = useState<FilterOptionsType>('oneYear')

  useEffect(() => {
    getWorkouts().then(data => setData(data))
  }, [])

  const handleClose = () => {
    setShowSingleWorkout(false)
    setSingleWorkoutData(null)
    setWorkoutId('')
  }

  useEffect(() => {
    const workoutData = data?.find(workout => workout.workoutId === workoutId)?.data
    if(workoutData) setSingleWorkoutData(workoutData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workoutId])

  const filteredData = data ? filterData(data, filterOption) : []

  return (
    <MainContainer flex direction='column'>
      <Header />
      <FilterOptions setFilterOption={setFilterOption} filterOption={filterOption}/>
      {data &&
        <DataDisplay data={filteredData} filterOption={filterOption}/>
      }
      {data && 
        <SufferScoreChart data={filteredData} maxScore={getMaxSufferScore(data)}/>
      }
      {data && 
        <WorkoutsPieCharts data={filteredData}/>
      }
      {data &&
        <DisplayWorkouts 
          data={filteredData} 
          setShowSingleWorkout={setShowSingleWorkout} 
          setWorkoutId={setWorkoutId} 
        />
      }
      {showSingleWorkout && singleWorkoutData && 
        <SingleWorkoutModal 
          workout={singleWorkoutData}   
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
