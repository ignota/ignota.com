import styled from 'styled-components'

export const Background = styled.span`
  background-color: currentColor;
  border-radius: 50%;
  display: block;
  height: 200%;
  left: -50%;
  pointer-events: none;
  position: absolute;
  top: -50%;
  width: 200%;
`

export const Foreground = styled.span`
  background-color: currentColor;
  border-radius: 50%;
  display: block;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  transform-origin: center;
`

export const Root = styled.span`
  height: 100%;
  left: 0;
  outline: none;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  will-change: opacity, transform;
`
