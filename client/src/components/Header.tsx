import { FC } from 'react'
import { Box, themes } from '../utils'
import styled from 'styled-components'

export const Header:FC = () => {
  return (
    <Box flex direction='column' justifyContent='center' alignItems='center' py='32px'>
      <Title>SufferScore</Title>
      <LogoWrapper flex gap='8px' my='12px'>
        <p>Powered by </p>
        <StravaLogo src='/images/stravaName.png' alt="Strava in block capitals in brand colour orange"></StravaLogo>
      </LogoWrapper>
    </Box>
  )
}

const LogoWrapper = styled(Box)`
  width: auto;
  p {
    margin: 0;
    transform: translateY(2px);
  }  
`

const StravaLogo = styled.img`
  width: 80px;
`

const Title = styled(Box)`
  width: auto;
  font-family: 'Arial', sans-serif;
  font-size: 64px;
  font-weight: bolder;
  color: ${themes.colors.primary};

  @media (max-width: 420px) {
    font-size: 48px;
  }
`