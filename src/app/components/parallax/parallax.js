import React, { PureComponent } from 'react'
import { addEventListener } from 'consolidated-events'
import combineTimelines from './combine-timelines'
import offset from 'dom-helpers/query/offset'
import { ParallaxRoot } from './styled-parallax'
import PropTypes from 'prop-types'
import R from 'ramda'

const POSITION = {
  ABOVE: 'ABOVE',
  BELOW: 'BELOW',
  INSIDE: 'INSIDE',
  INVISIBLE: 'INVISIBLE',
}

class Parallax extends PureComponent {
  static defaultProps = {
    onScroll: R.identity,
  }

  static childContextTypes = {
    timelines: PropTypes.array,
  }

  parallax = React.createRef()

  timelines = []

  getChildContext() {
    return {
      timelines: this.timelines,
    }
  }

  componentDidMount() {
    this.setupAnimation()
    this.removeScrollListener = addEventListener(window, 'scroll', this.handleScroll, { passive: true })
    this.handleScroll()
  }

  componentWillUnmount() {
    this.removeScrollListener()
    this.controller.kill()
    cancelAnimationFrame(this.rAF)
  }

  getPosition({ height, top }) {
    const innerHeight = window.innerHeight
    if (top > innerHeight) return POSITION.ABOVE
    if (top + height < 0) return POSITION.BELOW
    if (height === 0) return POSITION.INVISIBLE

    return POSITION.INSIDE
  }

  getScrollPosition(target) {
    if (target === window || target === document) {
      return window.pageYOffset == null
        ? document.documentElement.scrollTop
        : window.pageYOffset
    }

    return target.scrollTop || 0
  }

  handleScroll(...args) {
    this.rAF = requestAnimationFrame(() => this.handleScrollRAF(...args))
  }

  handleScrollRAF(e) {
    const target = e ? e.target : document.body
    const scrollTop = this.getScrollPosition(target)
    const rootRect = this.parallax.current.getBoundingClientRect()
    const { top: offsetTop } = offset(this.parallax.current)

    const position = this.getPosition(rootRect)
    if (position === POSITION.INSIDE) {
      const innerHeight = window.innerHeight
      const progress =
              (scrollTop + innerHeight - offsetTop) / (rootRect.height + innerHeight) * 100
      this.seek(progress)
      this.props.onScroll(progress)
    } else if (position === POSITION.ABOVE && this.prevPosition !== POSITION.ABOVE) {
      this.seek(0)
    } else if (position === POSITION.BELOW && this.prevPosition !== POSITION.BELOW) {
      this.seek(100)
    }

    this.prevPosition = position
  }

  seek(frame) {
    this.rAF = requestAnimationFrame(() => this.controller.tweenTo(frame, { ease: 'material-default' }))
  }

  setupAnimation() {
    this.controller = combineTimelines(this.timelines).duration(1).pause()
    this.controller.seek(0, false)
  }

  render() {
    const {
      children,
      component,
      onScroll: _onScroll,
      ...props
    } = this.props

    return (
      <ParallaxRoot as={ component } ref={ this.parallax } { ...props }>
        { children }
      </ParallaxRoot>
    )
  }
}

export default Parallax
