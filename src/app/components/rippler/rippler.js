import React, { PureComponent } from 'react'
import { findDOMNode } from 'react-dom'
import Ripple from './ripple'
import { RippleGroup } from './styled-rippler'
import { TransitionGroup } from 'react-transition-group'

class Rippler extends PureComponent {
  state = {
    key: 0,
    ripples: [],
  }

  handleTransitionEnd() {
    const [, ...tail] = this.state.ripples
    this.setState({ ripples: tail })
  }

  trigger(e) {
    if (this.props.disabled) return

    const { key, ripples } = this.state

    const rootEl = findDOMNode(this)
    const rootRect = rootEl
      ? rootEl.getBoundingClientRect()
      : { bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0 }

    const maxDim = Math.max(rootRect.height, rootRect.width)
    const surfaceDiameter = Math.sqrt(rootRect.width ** 2 + rootRect.height ** 2)
    const initialSize = maxDim * 0.6
    const maxRadius = surfaceDiameter + 10

    const scale = maxRadius / initialSize
    const duration = Math.sqrt(maxRadius / 1024) * 1000
    const startLeft = e.pageX - window.pageXOffset - rootRect.left - (initialSize / 2)
    const startTop = e.pageY - window.pageYOffset - rootRect.top - (initialSize / 2)
    const endLeft = (rootRect.width / 2) - (initialSize / 2)
    const endTop = (rootRect.height / 2) - (initialSize / 2)

    const nextRipples = [
      ...ripples,
      <Ripple
        duration={ duration }
        end={{ left: endLeft, top: endTop }}
        key={ key }
        scale={ scale }
        size={ initialSize }
        start={{ left: startLeft, top: startTop }}
        onTransitionEnd={ this.handleTransitionEnd } />,
    ]
    const nextKey = key + 1

    this.setState({ key: nextKey, ripples: nextRipples })
  }

  render() {
    return (
      <TransitionGroup enter exit component={ RippleGroup }>
        { this.state.ripples }
      </TransitionGroup>
    )
  }
}

export default Rippler
