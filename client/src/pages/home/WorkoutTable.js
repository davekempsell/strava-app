import React, { useEffect, useState } from "react";
import { getWorkouts } from "../../components/api-calls/getWorkouts";
import styled from 'styled-components'


export const WorkoutTable = () => {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getWorkouts(setData, setLoading)
  },[])

  if(loading) return (
    <WorkoutsContainer>
      <h3>Loading...</h3>
    </WorkoutsContainer>

  )

  const WorkoutRow = ({workout}) => {
    const newDate = new Date(workout.start_date_local)
    const yyyy = newDate.getFullYear()
    const mm = newDate.getMonth() + 1
    const dd = newDate.getDate()

    return (
      <WorkoutRowWrapper>
        <WorkoutDate>
          <p>{`${dd}/${mm}/${yyyy}`}</p>
        </WorkoutDate>
        <WorkoutName>
          <p>{workout.name}</p>
        </WorkoutName>
        <WorkoutType>
          <p>{workout.type}</p>
        </WorkoutType>
      </WorkoutRowWrapper>
    )
  }

  if(data) return (
    <WorkoutsContainer>
      <h3>Select Workout</h3>
      {data.map((w, index) => {
        return <WorkoutRow key={index} workout={w} />
      })}
    </WorkoutsContainer>
  )
}

const WorkoutsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
`

const WorkoutRowWrapper = styled.div`
  width: auto;
  display: flex;
  border: 1px solid black;
  padding: 8px;
  gap: 8px;
`

const WorkoutName = styled.div`
  width: 400px;
  background-color: #F9F9F9;
  padding: 0 8px;
`

const WorkoutType = styled.div`
  width: 120px;
  background-color: #F9F9F9;
  padding: 0 8px;
`

const WorkoutDate =styled.div`
  width: 82px;
  background-color: #F9F9F9;
  padding: 0 8px;
`