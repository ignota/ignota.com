import {
  ActiveStep,
  Root,
} from './styled-impress'
import React, { Children, useMutationEffect, useState } from 'react'
import { canUseDOM } from 'exenv'
import Controller from './controller'
import Listener from '../listener'
import R from 'ramda'
import Viewport from './viewport'

const Impress = React.memo(function Impress({ children, duration, height, maxScale, minScale, perspective, style: styleProp, width, ...props }) {
  const STEPS = Children.count(children) - 1

  const [step, setStep] = useState(0)

  const [animationState, setAnimationState] = useState({
    perspective,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    x: 0,
    y: 0,
    z: 0,
    zoomIn: false,
  })

  function computeWindowScale() {
    const heightScale = window.innerHeight / height
    const widthScale = window.innerWidth / width
    const scale = heightScale > widthScale ? widthScale : heightScale

    if (scale > maxScale) {
      return maxScale
    }

    if (scale < minScale) {
      return minScale
    }

    return scale
  }

  function handleTransform() {
    if (!canUseDOM) {
      return
    }

    const child = R.nth(step, Children.toArray(children))
    const childAnimationProps = R.pick(['rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'x', 'y', 'z'], child.props)

    const nextScale = (1 / childAnimationProps.scale) * computeWindowScale()
    const nextPerspective = perspective / nextScale
    const zoomIn = nextScale >= childAnimationProps.scale

    requestAnimationFrame(() => {
      setAnimationState(prev => ({
        ...prev,
        perspective: nextPerspective,
        rotate: -(childAnimationProps.rotate),
        rotateX: -(childAnimationProps.rotateX),
        rotateY: -(childAnimationProps.rotateY),
        rotateZ: -(childAnimationProps.rotateZ),
        scale: nextScale,
        x: -(childAnimationProps.x),
        y: -(childAnimationProps.y),
        z: -(childAnimationProps.z),
        zoomIn,
      }))
    })
  }

  const delay = duration / 2
  const canvasDelay = animationState.zoomIn ? 0 : delay
  const viewportDelay = animationState.zoomIn ? delay : 0
  const activeChildren = Children.map(children, (child, i) => {
    if (i !== step) {
      return child
    }

    return React.cloneElement(child, { as: ActiveStep })
  })

  const transform = `scale(${ animationState.scale })`
  const transition = `all ${ duration }ms cubic-bezier(0.35, 0, 0.25, 1) ${ canvasDelay }ms`
  const style = {
    ...styleProp,
    perspective: animationState.perspective,
    transform,
    transition,
  }

  useMutationEffect(handleTransform)

  return (
    <Root style={ style } { ...props }>
      <Controller setStep={ setStep } step={ step } steps={ STEPS }>
        <Viewport delay={ viewportDelay } duration={ duration } { ...R.omit(['perspective', 'scale', 'zoomIn'], animationState) }>
          { activeChildren }
        </Viewport>
      </Controller>
      <Listener target='window' onResize={ handleTransform } />
    </Root>
  )
})

Impress.defaultProps = {
  duration: 1250,
  height: 667,
  maxScale: 1,
  minScale: 0,
  perspective: 1000,
  width: 375,
}

export default Impress
