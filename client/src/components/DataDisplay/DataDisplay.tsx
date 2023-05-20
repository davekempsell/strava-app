import { FC, useEffect, useState } from "react";
import { FilterOptionsType, WorkoutData } from "../../types";
import { Box, themes } from "../../utils";
import styled from "styled-components";
import { calculateAverageDuration, calculateAverageSufferScore, calculateWeeklyWorkouts } from "./calculateStats";

interface Props {
  data: WorkoutData[]
  filterOption: FilterOptionsType
}

export const DataDisplay:FC<Props> = ({data, filterOption}) => {
  const [numberOfWorkouts, setNumberOfWorkouts] = useState(0)
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState(0)
  const [averageDuration, setAverageDuration] = useState('')
  const [averageSufferScore, setAverageSufferScore] = useState(0)

  useEffect(() => {
    setNumberOfWorkouts(data.length)
    setWorkoutsPerWeek(calculateWeeklyWorkouts(data.length, filterOption))
    setAverageDuration(calculateAverageDuration(data))
    setAverageSufferScore(calculateAverageSufferScore(data))
  }, [data, filterOption])

  return (
    <DataContainer flex py='24px' px='48px' justifyContent="space-between">
      <StatWrapper>
        <h2>Number of Workouts</h2>
        <h1>{numberOfWorkouts}</h1>
      </StatWrapper>
      <StatWrapper>
        <h2>Workouts per week</h2>
        <h1>{workoutsPerWeek}</h1>
      </StatWrapper>
      <StatWrapper>
        <h2>Average Duration</h2>
        <h1>{averageDuration}</h1>
      </StatWrapper>
      <StatWrapper>
        <h2>Average Suffer Score</h2>
        <h1>{averageSufferScore}</h1>
      </StatWrapper>

    </DataContainer>
  )
}

const DataContainer = styled(Box)`
  background-color: ${themes.colors.background};
`

const StatWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  padding: 16px;
  width: 252px;
  background-color: ${themes.colors.tertiary};

  h2,h1 {
    margin: 0;
  }

  &:last-child h1 {
    color: ${themes.colors.primary};
  }
`