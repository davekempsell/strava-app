import { FC, useEffect, useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, themes } from '../../utils';
import styled from 'styled-components';
import { WorkoutData } from '../../types';
import { getSufferScoreAverages } from './sufferScoreHelpers';
import { CustomTooltip } from './CustomTooltip';

interface Props {
  data: WorkoutData[]
  maxScore: number
}

export const SufferScoreChart:FC<Props> = ({data, maxScore}) => {
  const actualData = getSufferScoreAverages(data)

  const [showChart, setshowChart] = useState(window.innerWidth > 800);

  useEffect(() => {
    const handleResize = () => {
      setshowChart(window.innerWidth > 800);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const intervalSize = () => {
      if (actualData.length < 40) {
      return 0;
    } else {
      return Math.floor((actualData.length - 40) / 40) + 1;
    }
  }

  const yTicks = Array.from({length: (maxScore / 10) + 1}, (_, i) => i * 10);


  return (
    <> 
      {showChart &&
        <ChartContainer flex px='64px' my='32px'>
          <ResponsiveContainer width="100%" height='100%'>
            <LineChart data={actualData} margin={{ top: 0, right: 48, bottom: 64, left: 0}}>
              <Line type="monotone" dataKey="aveSuffering" stroke={themes.colors.primary} dot={false}/>
              <CartesianGrid stroke={themes.colors.secondary} strokeDasharray="5 5" />
              <XAxis dataKey="workout" interval={intervalSize()} />
              <YAxis domain={[0, maxScore]} ticks={yTicks}/>
              <Tooltip content={<CustomTooltip />}/>
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      }
    </>

  )
}

const ChartContainer = styled(Box)`
  height: 25dvw;

  // @media (max-width: 650px) {
  //   display: none;
  // }
`