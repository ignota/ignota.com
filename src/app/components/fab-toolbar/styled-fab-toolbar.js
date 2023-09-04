import {
  ButtonIcon,
  FAB,
} from '../button'
import styled from 'styled-components'

export const Action = styled.div`
  height: 100%;
  opacity: ${ ({ open }) => open ? '1' : '0' };
  pointer-events: auto;
  transform: ${ ({ open }) => open ? 'scale(1)' : 'scale(0)' };
  transition-duration: ${ ({ open, theme }) => open ? theme.transition.duration.exit : theme.transition.duration.enter };
  transition-property: opacity, transform;
  transition-timing-function: ${ ({ open, theme }) => open ? theme.transition.timing.exit : theme.transition.timing.enter };
`

export const Actions = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  grid-template-columns: 1fr;
  grid-template-rows: 100%;
  height: 100%;
  left: auto;
  pointer-events: ${ ({ open }) => open ? 'auto' : 'none' };
  position: absolute;
  right: auto;
  z-index: 20;

  ${ ({ theme }) => theme.helpers.media.greaterThan('small')`
    left: ${ ({ direction }) => direction === 'left' ? 'auto' : '0' };
    right: ${ ({ direction }) => direction === 'right' ? 'auto' : '0' };
  ` }
`

export const Background = styled.div`
  background-color: ${ ({ color, theme }) => theme.palette.rgb[color] };
  display: flex;
  left: 0;
  position: absolute;
  top: 0;
  transform: ${ ({ backgroundScale, open }) => open ? `scale(${ backgroundScale })` : 'scale(1)' };
  transition: transform 600ms ${ ({ theme }) => theme.transition.timing.standard } ${ ({ open }) => open ? '0ms' : '200ms' };
  z-index: 10;
`

export const Icon = styled(ButtonIcon)`
  &&& {
    margin: 0;
  }
`

export const Root = styled.div`
  pointer-events: none;
  position: absolute;
  width: 100%;
`

export const Trigger = styled(FAB)`
  &&&&& {
    left: ${ ({ direction }) => direction === 'right' ? '1rem' : 'auto' };
    pointer-events: auto;
    position: absolute;
    right: ${ ({ direction }) => direction === 'left' ? '1rem' : 'auto' };
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;

    svg {
      opacity: ${ ({ open }) => open ? '0' : '1' };
      transition: opacity 200ms ${ ({ theme }) => theme.transition.timing.standard } ${ ({ open }) => open ? '0ms' : '300ms' };
      z-index: 15;
    }
  }
`

export const Wrapper = styled.nav`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 6rem;
  justify-content: flex-start;
  overflow: hidden;
  pointer-events: none;
  position: relative;
`
