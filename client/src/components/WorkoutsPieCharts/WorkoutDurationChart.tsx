import {FC} from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { Box, themes } from '../../utils';
import { WorkoutData } from '../../types';
import { hexToRGBA } from '../../utils/helpers/general';

interface Props {
  data: WorkoutData[]
}

export const WorkoutDurationChart:FC<Props> = ({data}) => {
  const getWorkoutTypes = (data: WorkoutData[]) => {
    const types = data.map(workout => workout.data.type)

    let workoutTypes: { [key: string]: number} = {}

    types.forEach(type => {
      if(workoutTypes[type]) {
        workoutTypes[type]++
      } else {
        workoutTypes[type] = 1
      }
    })

    const chartData = Object.entries(workoutTypes).map(([type, value]) => ({type, value}))

    return chartData
  }

  const getWorkoutDurations = (data: WorkoutData[]) => {
    const workoutDurations = data.map(workout => {
      switch(true) {
        case (workout.data.moving_time <= 600):
          return '0-10 minutes';
        case (workout.data.moving_time <= 1200):
          return '10-20 minutes';
        case (workout.data.moving_time <= 1800):
          return '20-30 minutes';
        case (workout.data.moving_time <= 2400):
          return '30-40 minutes';
        case (workout.data.moving_time <= 3000):
          return '40-50 minutes';
        case (workout.data.moving_time <= 3600):
          return '50-60 minutes';
        case (workout.data.moving_time > 7200):
          return '120+ minutes'
        case (workout.data.moving_time > 5400):
          return '90+ minutes'
        case (workout.data.moving_time > 3600):
          return '60+ minutes'
        default:
          return 'no time recorded'
      }
    })
      
    let durations: { [key: string]: number} = {}

    workoutDurations.forEach(duration => {
      if(durations[duration]) {
        durations[duration]++
      } else {
        durations[duration] = 1
      }
    })

    const order = [
    '0-10 minutes',
    '10-20 minutes',
    '20-30 minutes',
    '30-40 minutes',
    '40-50 minutes',
    '50-60 minutes',
    '60+ minutes',
    '90+ minutes',
    '120+ minutes',
    'no time recorded',
  ];

  const chartData = order.map(duration => ({
    duration,
    value: durations[duration] || 0,
  }));

    return chartData
  }

  const getColors = () => {
    const workouts = getWorkoutDurations(data)
    const colors = workouts.map((workout, index) => {
      const opacity = (1 / workouts.length) * (index + 1);
      return hexToRGBA(themes.colors.primary, opacity)
    })

    return colors
  }

  const COLORS = getColors();

  return (
    <ChartWrapper flex direction='column' alignItems='center' p='16px' gap='16px'>
      <h3>Workout Durations</h3>
      <ResponsiveContainer width="100%">
        <PieChart margin={{top: 0, right: 0, bottom: 0, left: 0}}>
          <Pie
            data={getWorkoutDurations(data)}
            dataKey="value"
            nameKey="duration"
            cx="50%"
            cy="50%"
            outerRadius='90%'
          >
            {getWorkoutDurations(data).map((entry, index) => (
              <Cell key={entry.duration} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend 
            wrapperStyle={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
            align="center"
            verticalAlign="bottom"
            formatter={(value, entry) => <span style={{ color: themes.colors.darkText }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );

}

const ChartWrapper = styled(Box)`
  height: 450px;
  width: 450px;
  background-color: ${themes.colors.background};
  h3 {
    margin: 0;
  }

  @media(max-width: 800px) {
    height: 60%;
    width: 60%;
    max-width: 350px;
  }
`