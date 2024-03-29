import {FC} from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { Box, themes } from '../../utils';
import { WorkoutData } from '../../types';
import { getColors, getWorkoutTypes } from './pieChartHelpers';

interface Props {
  data: WorkoutData[]
}

export const WorkoutTypesChart:FC<Props> = ({data}) => {
  const colors = getColors(data, themes.colors.primary);

  return (
    <ChartContainer flex width='auto' direction='column' alignItems='center' p='16px' gap='16px'>
      <h3>Workout Types</h3>
      <ChartWrapper>
        <ResponsiveContainer width="100%">
          <PieChart margin={{top: 0, right: 0, bottom: 0, left: 0}}>
            <Pie
              data={getWorkoutTypes(data)}
              dataKey="value"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius='90%'
            >
              {getWorkoutTypes(data).map((entry, index) => (
                <Cell key={entry.type} fill={colors[index % colors.length]} />
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
      
    </ChartContainer>
  );

}

const ChartContainer = styled(Box)`
  background-color: ${themes.colors.background};
  h3 {
    margin: 0;
  }
`

const ChartWrapper = styled(Box)`
  width: 400px;
  height: 400px;

  @media(max-width: 800px) {
    width: 300px;
    height: 300px;
  }
`