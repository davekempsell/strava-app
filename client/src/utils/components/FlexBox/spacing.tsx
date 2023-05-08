type Spacing = '4px' | '8px' | '12px' | '16px' | '24px' | '32px' | '48px' | '64px'

export type SpacingProp = '0' | Spacing | { custom: number | string }

export const resolveSpacing = (value:SpacingProp| 'auto') => {
  if (typeof value === 'string') {
    return value
  }

  if (typeof value.custom === 'string') {
    return value.custom
  }

  return `${value.custom}px`
}

export interface MarginProps {
  m?: SpacingProp
  mx?: SpacingProp| 'auto'
  my?: SpacingProp
  ml?: SpacingProp
  mr?: SpacingProp
  mt?: SpacingProp
  mb?: SpacingProp
}

export interface PaddingProps {
  p?: SpacingProp
  px?: SpacingProp
  py?: SpacingProp
  pl?: SpacingProp
  pr?: SpacingProp
  pt?: SpacingProp
  pb?: SpacingProp
}

export const margin = (props: MarginProps): string => {
  const { m, mx, my, ml, mr, mt, mb } = props

  return `
    ${m ? `margin: ${m}` : ''}
    ${mx 
      ? `
        margin-left: ${mx};
        margin-right: ${mx};
      `
      : ''
    }
    ${my 
      ? `
        margin-top: ${my};
        margin-bottom: ${my};
      `
      : ''
    }
    ${ml ? `margin-left: ${ml}` : ''}
    ${mr ? `margin-right: ${mr}` : ''}
    ${mt ? `margin-top: ${mt}` : ''}
    ${mb ? `margin-bottom: ${mb}` : ''}
  `
}

export const padding = (props: PaddingProps): string => {
  const { p, px, py, pl, pr, pt, pb } = props

    return `
    ${p ? `padding: ${p}` : ''}
    ${px 
      ? `
        padding-left: ${px};
        padding-right: ${px};
      `
      : ''
    }
    ${py 
      ? `
        padding-top: ${py};
        padding-bottom: ${py};
      `
      : ''
    }
    ${pl ? `padding-left: ${pl}` : ''}
    ${pr ? `padding-right: ${pr}` : ''}
    ${pt ? `padding-top: ${pt}` : ''}
    ${pb ? `padding-bottom: ${pb}` : ''}
  `
}