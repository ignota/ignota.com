import {
  at,
  of,
  slice,
  span,
} from '@ignota/susy.js'
import styled from 'styled-components'

export const ListBase = styled.div`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  width: 100%;

  ${ ({ theme }) => theme.helpers.media.greaterThan('medium')`
    width: ${ span(1, at(2), of(slice(3, at(3)))) };
  ` }
`

export const Decorator = styled.span`
  ${ ({ theme }) => theme.helpers.typography.accent }

  align-items: center;
  border-right: 2px solid ${ ({ decoratorColor, theme }) => theme.palette.chroma[decoratorColor].alpha(0.33).css() };
  color: ${ ({ decoratorColor, theme }) => theme.palette.chroma[decoratorColor].alpha(0.66).css() };
  display: flex;
  font-feature-settings: 'tnum';
  font-size: 4.3rem;
  font-variant-numeric: tabular-nums;
  height: 100%;
  justify-content: center;
  position: absolute;
  width: ${ ({ hasNumber }) => hasNumber ? '8.6rem' : '0' };

  & > svg {
    fill: currentColor;
    height: auto;
    width: 15%;
  }
`
