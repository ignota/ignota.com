import { I } from './styled-text-field-adornment'
import styled from 'styled-components'

const Placeholder = styled.span`
  bottom: 1px;
  color: ${ ({ theme }) => theme.palette.rgb.placeholder };
  font-size: inherit;
  opacity: ${ ({ active }) => active ? '1' : '0' };
  letter-spacing: 0.04em;
  padding: 0;
  pointer-events: none;
  position: absolute;
  transition: opacity 180ms ${ ({ theme }) => theme.transition.timing.standard };
  user-select: none;
  width: 100%;

  ${ I }:first-child ~ & {
    padding-left: 3.5rem;
  }
`

export default Placeholder
