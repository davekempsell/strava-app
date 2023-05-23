import { FC } from "react"
import { Payload } from "recharts/types/component/DefaultTooltipContent"
import { Box, themes } from "../../utils"
import styled from "styled-components"

interface DataItem {
  workout: number
  date: string
  tooltipLabel: string
  aveSuffering: number
  sufferScore: number
}

interface TooltipPayload extends Payload<number, string> {
  payload: DataItem;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

export const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <TooltipContainer>
        <p>{payload[0].payload.tooltipLabel}</p>
          <SufferScoreWrapper flex direction='column' mt='8px'>
            <h4>Workout SufferScore:</h4>
            <h3>{payload[0].payload.sufferScore}</h3>
          </SufferScoreWrapper>
          <SufferScoreWrapper flex direction='column' mt='8px'>
          <h4>Ave. SufferScore:</h4>
          <h3>{payload[0].payload.aveSuffering}</h3>
          </SufferScoreWrapper>
      </TooltipContainer>

    );
  }

  return null;
};

const TooltipContainer = styled(Box)`
  background-color: ${themes.colors.background};
  border: 1px solid ${themes.colors.secondary};
  padding: 12px;

  p {
    margin: 0;
    color: ${themes.colors.darkText}
  }
`

const SufferScoreWrapper = styled(Box)`
  h4 {
    margin: 0;
  }

  h3 {
    margin: 8px 0 0 0;
    color: ${themes.colors.primary};
  }
`