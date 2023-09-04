import React, { PureComponent } from 'react'
import { AnimatedDiv } from './styled-parallax-layer'
import { Controller } from 'react-spring'
import { ParallaxContext } from './parallax'

class ParallaxLayer extends PureComponent {
  static contextType = ParallaxContext

  static defaultProps = {
    factor: 1,
    speed: 0,
  }

  componentDidMount() {
    const parent = this.context
    if (parent) {
      parent.layers = parent.layers.concat(this)
      parent.update()
    }
  }

  componentWillUnmount() {
    const parent = this.context
    if (parent) {
      parent.layers = parent.layers.filter(l => l !== this)
      parent.update()
    }
  }

  initialize() {
    const { factor, speed } = this.props
    const { current, space } = this.context
    const { config } = this.context.props

    const targetScroll = Math.floor(space)
    const offset = space + targetScroll * speed
    const translate = (current * speed + offset) * -1

    this.animatedTranslate = new Controller({ config, to: { translate } })
    this.animatedSpace = new Controller({ config, to: { height: space * factor } })
  }

  setHeight(height, immediate = false) {
    const { factor } = this.props

    height = height * factor

    this.animatedSpace.update({ immediate, to: { height } })
  }

  setPosition(height, scrollTop, immediate = false) {
    const { speed } = this.props

    const translate = (height / 2 - scrollTop) * speed

    this.animatedTranslate.update({ immediate, to: { translate } })
  }

  renderLayer() {
    const {
      children,
      factor: _factor,
      speed: _speed,
      style,
      ...props
    } = this.props

    if (!this.animatedTranslate || !this.animatedSpace) {
      this.initialize()
    }

    const { translate } = this.animatedTranslate.getValues()
    const { height } = this.animatedSpace.getValues()

    return (
      <AnimatedDiv
        style={{
          ...style,
          height,
          transform: translate.interpolate(t => `translate3d(0px, ${ t }px, 0px)`),
        }}
        { ...props }>
        { children }
      </AnimatedDiv>
    )
  }

  render() {
    return this.renderLayer()
  }
}

export default ParallaxLayer
