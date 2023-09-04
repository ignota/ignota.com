import { I } from '../text-field/styled-text-field-adornment'
import { standardShake } from './keyframes-floating-label'
import styled from 'styled-components'

export const Label = styled.label`
  animation: ${ ({ shake }) => shake ? `${ standardShake } 250ms 1` : 'none' };
  color: ${ ({ active, disabled, error, float, labelColor, theme }) => {
    if (error) return theme.palette.rgb.danger

    return float && active
      ? theme.palette.rgb[labelColor]
      : disabled
        ? theme.palette.rgb.disabled
        : theme.palette.rgb.inputLabel
  } };
  cursor: ${ ({ float }) => float ? 'default' : 'text' };
  left: 0;
  pointer-events: none;
  position: absolute;
  transform: ${ ({ float }) => float ? 'translateY(-100%) scale(0.9)' : 'none' };
  transform-origin: left top;
  transition:
    color 180ms ${ ({ theme }) => theme.transition.timing.standard },
    transform 180ms ${ ({ theme }) => theme.transition.timing.standard };
  user-select: none;

  ${ I }:first-child ~ & {
    left: 3.5rem;
  }
`
