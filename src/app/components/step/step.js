import React from 'react'
import { Root } from './styled-step'

const Step = React.memo(function Step({ as, children, rotate, rotateX, rotateY, rotateZ, scale, x, y, z, ...props }) {
  const transform = `translate(-50%, -50%) translate3d(${ x }px, ${ y }px, ${ z }px) rotateX(${ rotateX }deg) rotateY(${ rotateY }deg) rotateZ(${ rotateZ || rotate }deg) scale(${ scale })`

  return (
    <Root as={ as } style={{ transform }} { ...props }>
      { children }
    </Root>
  )
})

Step.defaultProps = {
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  scale: 1,
  x: 0,
  y: 0,
  z: 0,
}

export default Step
