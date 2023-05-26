import { FC, useEffect, useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from 'recharts';
import { Box, themes } from '../../utils';
import styled from 'styled-components';
import { WorkoutData } from '../../types';
import { getSufferScoreAverages } from './sufferScoreHelpers';
import { CustomTooltip } from './CustomTooltip';

interface Props {
  filteredData: WorkoutData[]
  maxScore: number
}

export const SufferScoreChart:FC<Props> = ({filteredData, maxScore}) => {
  const chartData = getSufferScoreAverages(filteredData)

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
      if (chartData.length < 40) {
      return 0;
    } else {
      return Math.floor((chartData.length - 40) / 40) + 1;
    }
  }

  const yTicks = Array.from({length: (maxScore / 10) + 1}, (_, i) => i * 10);


  return (
    <> 
      {showChart &&
        <MainContainer flex px='64px' py='32px'>
          <ChartContainer flex direction='column' alignItems='center' width='auto'>
            <h3>Average SufferScore</h3>
            <ChartWrapper>
              <ResponsiveContainer width="100%" height='90%'>
                <LineChart data={chartData} margin={{ top: 16, right: 48, bottom: 32, left: 16}}>
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
        </MainContainer>
      }
    </>

  )
}

const MainContainer = styled(Box)`
  border-top: 1px solid ${themes.colors.secondary};
  background-color: ${themes.colors.tertiary};
`

const ChartContainer = styled(Box)`
  background-color: ${themes.colors.background};

  h3 {
    margin: 16px 0 0 0;
  }
`

const ChartWrapper = styled(Box)`
  width: 90vw;
  height: 40vw;
`