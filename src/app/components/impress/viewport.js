import React from 'react'
import { Root } from './styled-viewport'

const Viewport = React.memo(function Viewport({ children, delay, duration, rotate, rotateX, rotateY, rotateZ, x, y, z }) {
  const transform = `rotateZ(${ rotateZ || rotate }deg) rotateY(${ rotateY }deg) rotateX(${ rotateX }deg) translate3d(${ x }px, ${ y }px, ${ z }px)`
  const transition = `all ${ duration }ms cubic-bezier(0.35, 0, 0.25, 1) ${ delay }ms`

  return (
    <Root style={{ transform, transition }}>
      { children }
    </Root>
  )
})

export default Viewport
