import {
  at,
  gutter,
  of,
  slice,
  span,
  wide,
} from '@ignota/susy.js'
import styled from 'styled-components'

const Aside = styled.aside`
  margin: 1.777rem auto;
  width: ${ span(2, at(1), of(slice(3, at(3)))) };

  ${ ({ theme }) => theme.helpers.media.greaterThan('medium')`
    float: ${ ({ float }) => float === 'center' ? 'none' : float };
    margin-left: ${ ({ float }) => float === 'left' ? `-${ span(2, wide, at(2)) }` : float === 'center' ? 'auto' : gutter(of(slice(3, at(3)))) };
    margin-right: ${ ({ float }) => float === 'right' ? `-${ span(2, wide, at(2)) }` : float === 'center' ? 'auto' : gutter(of(slice(3, at(3)))) };
    width: ${ span(1, at(2), of(slice(3, at(3)))) };
  ` }
`

export default Aside
