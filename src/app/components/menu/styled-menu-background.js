import styled from 'styled-components'

export const Scrim = styled.div`
  background-color: ${ ({ theme }) => theme.palette.rgb.black };
  cursor: pointer;
  height: calc(100% - 6rem);
  left: 0;
  opacity: ${ ({ open }) => open ? '0.6' : '0' };
  pointer-events: ${ ({ open }) => open ? 'auto' : 'none' };
  position: fixed;
  top: 6rem;
  transition: opacity ${ ({ open, theme }) => open ? theme.transition.duration.exit : theme.transition.duration.enter } ${ ({ open, theme }) => open ? theme.transition.timing.exitTemporary : theme.transition.timing.enter } ${ ({ open }) => open ? '200ms' : '0ms' };
  width: 100%;
  z-index: 100;
`
