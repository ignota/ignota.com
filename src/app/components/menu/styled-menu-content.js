import { animated } from 'react-spring'
import styled from 'styled-components'

export const Wrapper = styled(animated.div)`
  background-color: #FFF;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  overflow-y: ${ ({ open }) => open ? 'hidden' : 'auto' };
  transform: ${ ({ open }) => open ? 'translate3d(0, 6rem, 0)' : 'translate3d(0, 0, 0)' };
  transition: transform ${ ({ open, theme }) => open ? theme.transition.duration.exit : theme.transition.duration.enter } ${ ({ open, theme }) => open ? theme.transition.timing.exitTemporary : theme.transition.timing.enter } ${ ({ open }) => open ? '0ms' : '200ms' };
  width: 100%;
`
