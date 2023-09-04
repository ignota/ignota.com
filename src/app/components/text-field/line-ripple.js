import styled from 'styled-components'

const LineRipple = styled.div`
  background-color: ${ ({ error, lineColor, theme }) => error ? theme.palette.rgb.danger : theme.palette.rgb[lineColor] };
  bottom: 0;
  height: 2px;
  left: 3.5rem;
  opacity: ${ ({ active }) => active ? '1' : '0' };
  position: absolute;
  transform: ${ ({ active }) => active ? 'scaleX(1)' : 'scaleX(0)' };
  transform-origin: ${ ({ center = 0 }) => `${ center }px center` };
  transition:
    transform 180ms ${ ({ theme }) => theme.transition.timing.standard },
    opacity 180ms ${ ({ theme }) => theme.transition.timing.standard };
  width: calc(100% - 3.5rem);
`

export default LineRipple
