import {FC} from 'react'
import { Box } from '../utils/components/FlexBox/FlexBox'
import styled from 'styled-components'
import { themes } from '../utils'
import { FilterOptionsType } from '../types'

interface Props {
  filterOption: FilterOptionsType
  setFilterOption: (filterOption: FilterOptionsType) => void
}

export const FilterOptions:FC<Props> = ({filterOption, setFilterOption}) => {

  const handleClick = (filterOption: FilterOptionsType) => {
    setFilterOption(filterOption)
  }

  return (
    <FilterContainer>
      <FilterBox 
        key='oneYear'
        isActive={filterOption === 'oneYear'} 
        onClick={() => handleClick('oneYear')}
      >
        1 year
      </FilterBox>
      <FilterBox 
        key='sixMonths'
        isActive={filterOption === 'sixMonths'} 
        onClick={() => handleClick('sixMonths')}
      >
        6 months
      </FilterBox>
      <FilterBox 
        key='ninetyDays'
        isActive={filterOption === 'ninetyDays'} 
        onClick={() => handleClick('ninetyDays')}
      >
        90 days
      </FilterBox>
      <FilterBox 
        key='thirtyDays'
        isActive={filterOption === 'thirtyDays'} 
        onClick={() => handleClick('thirtyDays')}
      >
        30 days
      </FilterBox>
    </FilterContainer>
  )
}

const FilterContainer = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-right: 32px;
  margin-bottom: 8px;

  @media (max-width: 800px) {
    justify-content: center;
    padding: 0;
  }
`

interface FilterBoxProps {
  isActive: boolean
}

const FilterBox = styled(Box)<FilterBoxProps>`
  display: flex;
  justify-content: center;
  padding: 8px;
  color: ${(props) => props.isActive ? themes.colors.lightText : themes.colors.text};
  font-weight: ${(props) => props.isActive ? '700' : '400'};
  background-color: ${(props) => props.isActive ? themes.colors.primary : themes.colors.background};
  border: 1px solid ${themes.colors.secondary};
  transition: all 400ms ease-in-out;
  width: 90px;
  font-size: 14px;

  &:not(:last-child) {
    border-right: 1px solid #D3D3D3;
  }
  
  :hover {
    cursor: pointer;
    background-color: ${(props) => props.isActive ? themes.colors.primary : themes.colors.tertiary};
  }

  @media (max-width: 420px) {
    width: 75px;
    font-size: 12px;
  }
`