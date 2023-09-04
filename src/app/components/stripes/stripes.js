import React, { PureComponent } from 'react'
import {
  Root,
  Stripe1,
  Stripe2,
  Stripe3,
  Stripe4,
  Stripe5,
} from './styled-stripes'
import chroma from 'chroma-js'

class Stripes extends PureComponent {
  static defaultProps = {
    alpha: 0.8,
    gradient: [],
  }

  render() {
    const {
      alpha,
      gradient,
    } = this.props

    const scale = chroma
      .scale(gradient)
      .mode('lab')
      .correctLightness()
      .colors(5, null)
      .map(c => c.alpha(alpha))

    return (
      <Root alpha={ alpha } scale={ scale }>
        <Stripe1 scale={ scale } />
        <Stripe2 scale={ scale } />
        <Stripe3 alpha={ alpha } />
        <Stripe4 scale={ scale } />
        <Stripe5 alpha={ alpha } scale={ scale } />
      </Root>
    )
  }
}

export default Stripes
