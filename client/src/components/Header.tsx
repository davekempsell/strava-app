import { FC } from 'react'
import { Box } from '../utils'
import styled from 'styled-components'

export const Header:FC = () => {
  return (
    <Box flex justifyContent='center' py='32px'>
      <StravaLogo src='/images/stravaName.png' alt="Strava in block capitals in brand colour orange"></StravaLogo>
    </Box>
  )
}

const StravaLogo = styled.img`
  width: 30vw;
  min-width: 320px;
`