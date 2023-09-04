import {
  at,
  of,
  slice,
  span,
  wide,
} from '@ignota/susy.js'
import styled from 'styled-components'

const Lede = styled.aside`
  ${ ({ theme }) => theme.helpers.typography.accent }

  color: ${ ({ theme }) => theme.palette.rgb.ledeText };
  font-style: italic;
  font-weight: 300;
  margin: 4rem 0;
  width: 100%;

  ${ ({ theme }) => theme.helpers.media.greaterThan('medium')`
    margin-left: ${ span(1, wide, of(slice(3, at(3)))) };
    width: ${ span(1, at(2), of(slice(3, at(3)))) };
  ` }

  em {
    font-style: normal;
  }
`

export default Lede
