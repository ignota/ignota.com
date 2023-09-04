import AvatarBase from '../avatar'
import { ButtonBase } from '../button'
import styled from 'styled-components'

export const Avatar = styled(AvatarBase)`
  &&& {
    font-size: 1.6rem;
    height: 3.2rem;
    margin-right: -4px;
    transform: translateZ(0);
    width: 3.2rem;
  }
`

export const Background = styled.span`
  background: ${ ({ bg }) => bg };
  border-radius: inherit;
  display: block;
  height: 100%;
  opacity: 0.66;
  pointer-events: none;
  position: absolute;
  transition: opacity ${ ({ theme }) => theme.transition.duration.enter } ${ ({ theme }) => theme.transition.timing.standard };
  width: 100%;
`

export const Foreground = styled.span`
  align-items: center;
  border-radius: inherit;
  font-weight: 600;
  display: flex;
  height: 100%;
  justify-content: center;
  padding: 0 1.2rem;
  position: relative;
  transform: translateZ(0);
  width: 100%;
`

export const Root = styled(ButtonBase)`
  &&& {
    ${ ({ theme }) => theme.helpers.typography.accent }

    border: none;
    border-radius: 1.6rem;
    box-shadow: ${ ({ theme }) => theme.elevation.box[0] };
    color: ${ ({ theme }) => theme.palette.rgb.white };
    cursor: pointer;
    display: inline-flex;
    font-size: 1.333rem;
    height: 3.2rem;
    outline: none;
    padding: 0;
    position: relative;
    text-decoration: none;
    transition: box-shadow ${ ({ theme }) => theme.transition.duration.elevation } ${ ({ theme }) => theme.transition.timing.standard };
    white-space: nowrap;

    &:hover {
      & > ${ Background } {
        opacity: 0.85;
      }
    }

    &:active {
      box-shadow: ${ ({ theme }) => theme.elevation.box[1] };

      & > ${ Background } {
        opacity: 1;
      }
    }
  }
`
