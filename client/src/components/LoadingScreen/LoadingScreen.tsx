import { FC } from "react";
import { FadeLoader } from 'react-spinners';
import { Box, themes } from "../../utils";
import styled from "styled-components";

interface Props {
  isLoading: boolean
}

export const LoadingScreen:FC<Props> = ({isLoading}) => {
  return (
    <LoadingContainer 
      flex 
      direction="column" 
      alignItems="center" 
    >
      <FadeLoader 
        color={themes.colors.primary} 
        loading={isLoading}
        speedMultiplier={1}
        height={25}
        margin={15}
      />
    </LoadingContainer>
  )
}

const LoadingContainer = styled(Box)`
  height: calc(100dvh - 180px);
  padding-top: 128px;
`