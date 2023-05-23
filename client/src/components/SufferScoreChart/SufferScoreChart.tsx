import { FC, useEffect, useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from 'recharts';
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
        <ChartContainer flex px='64px' py='32px'>
          <ChartWrapper flex direction='column' alignItems='center'>
            <h3>Average SufferScore</h3>
            <ResponsiveContainer width="100%" height='90%'>
              <LineChart data={actualData} margin={{ top: 16, right: 48, bottom: 32, left: 16}}>
                <Line type="monotone" dataKey="aveSuffering" stroke={themes.colors.primary} dot={false}/>
                <CartesianGrid stroke={themes.colors.secondary} strokeDasharray="5 5" />
                <XAxis dataKey="workout" interval={intervalSize()}>
                  <Label value="Workout" position="insideBottom" offset={-8} />
                </XAxis>
                <YAxis domain={[0, maxScore]} ticks={yTicks}>
                  <Label 
                    value="SufferScore" 
                    position='insideLeft' 
                    offset={16} 
                    angle={-90} 
                    style={{ textAnchor: 'middle' }}
                  />
                </YAxis>
                <Tooltip content={<CustomTooltip />}/>
              </LineChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </ChartContainer>
      }
    </>

  )
}

const ChartContainer = styled(Box)`
  height: 25dvw;
  border-top: 1px solid ${themes.colors.secondary};
  background-color: ${themes.colors.tertiary};
`

const ChartWrapper = styled(Box)`
  background-color: ${themes.colors.background};

  h3 {
    margin: 16px 0 0 0;
  }
`