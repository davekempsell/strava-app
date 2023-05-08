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
`

interface FilterBoxProps {
  isActive: boolean
}

const FilterBox = styled(Box)<FilterBoxProps>`
  padding: 8px;
  color: ${(props) => props.isActive ? themes.colors.orange : 'black'};
  border-bottom: 2px solid ${(props) => props.isActive ? themes.colors.orange : 'transparent'};
  transition: all 400ms ease-in-out;

  &:not(:last-child) {
    border-right: 1px solid #D3D3D3;
  }
  
  :hover {
    cursor: pointer;
    border-bottom: 2px solid ${themes.colors.orange};
  }
`