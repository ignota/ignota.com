import {
  config,
  Controller,
} from 'react-spring'
import React, { PureComponent } from 'react'
import { addEventListener } from 'consolidated-events'
import { Container } from './styled-parallax'
import height from 'dom-helpers/query/height'
import offset from 'dom-helpers/query/offset'
import R from 'ramda'
import scrollTop from 'dom-helpers/query/scrollTop'

export const ParallaxContext = React.createContext(null)

class Parallax extends PureComponent {
  static defaultProps = {
    config: config.slow,
  }

  busy = false

  container = React.createRef()

  current = 0

  layers = []

  offset = 0

  removeResizeListener = R.identity

  removeScrollListener = R.identity

  space = 0

  componentDidMount() {
    this.removeResizeListener = addEventListener(window, 'resize', this.handleResize, { capture: false, passive: true })
    this.removeScrollListener = addEventListener(window, 'scroll', this.handleScroll, { capture: true, passive: true })
    this.update()
  }

  componentDidUpdate() {
    this.update()
  }

  componentWillUnmount() {
    this.removeResizeListener()
  }

  handleResize() {
    this.update()
  }

  handleScroll() {
    if (!this.busy) {
      this.busy = true
      this.moveLayers()
      this.current = scrollTop(window) + height(window) / 2 - offset(this.container.current).top
    }
  }

  moveLayers() {
    this.layers.forEach(l => l.setPosition(this.space, this.current))
    this.busy = false
  }

  scrollStop() {
    this.animatedScroll && this.animatedScroll.stop()
  }

  scrollTo(offset) {
    const { config } = this.props
    this.scrollStop()
    this.offset = offset
    const target = document.getElementById('scroller')
    this.animatedScroll = new Controller({
      config,
      from: { scrollTop: this.container.current.scrollTop },
      onFrame: ({ scrollTop }) => {
        target.scrollTop = scrollTop
      },
      to: { scrollTop: offset * this.space },
    }).start()
  }

  update() {
    if (!this.container.current) return
    this.space = this.container.current.clientHeight
    this.current = scrollTop(window) + height(window) / 2 + offset(this.container.current).top
    this.layers.forEach(l => {
      l.setHeight(this.space, true)
      l.setPosition(this.space, this.current, true)
    })
  }

  render() {
    const {
      children,
      config: _config,
      ...props
    } = this.props

    return (
      <Container ref={ this.container } { ...props }>
        <ParallaxContext.Provider value={ this }>
          { children }
        </ParallaxContext.Provider>
      </Container>
    )
  }
}

export default Parallax
