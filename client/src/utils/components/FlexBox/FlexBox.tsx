import styled from "styled-components"

import { flex, FlexProps } from "./flex"
import { measure, MeasureProps } from './measure'
import { margin, padding, MarginProps, PaddingProps } from './spacing'

export type BoxProps = FlexProps & MarginProps & PaddingProps & MeasureProps

export const Box = styled.div<BoxProps>`
  ${flex};
  ${margin};
  ${padding};
  ${measure};
`