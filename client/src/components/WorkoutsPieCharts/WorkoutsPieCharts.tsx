import {FC} from 'react';
import styled from 'styled-components';
import { Box, themes } from '../../utils';
import { WorkoutData } from '../../types';
import { WorkoutTypesChart } from './WorkoutTypesChart';
import { WorkoutDurationChart } from './WorkoutDurationChart';

interface Props {
  data: WorkoutData[]
}

export const WorkoutsPieCharts:FC<Props> = ({data}) => {

  return (
    <ChartsContainer 
      flex 
      wrap='wrap' 
      px='64px' 
      py='32px' 
      justifyContent='center' 
      gap='32px'
    >
      <WorkoutTypesChart data={data} />
      <WorkoutDurationChart data={data} />
    </ChartsContainer>
  );

}

const ChartsContainer = styled(Box)`
  border-top: 1px solid ${themes.colors.secondary};
  background-color: ${themes.colors.tertiary};
`