import {
  Background,
  Foreground,
  Root,
} from './styled-ripple'
import React, { PureComponent } from 'react'
import { addEventListener } from 'consolidated-events'
import R from 'ramda'
import { Transition } from 'react-transition-group'

class Ripple extends PureComponent {
  static defaultProps = {
    onExited: R.identity,
    onTransitionEnd: R.identity,
    opacity: 0.16,
  }

  bg = React.createRef()

  state = {
    entering: false,
    exiting: false,
  }

  endListener(node, cb) {
    const finished = e => {
      this.removeTransitionListener()
      this.props.onExited(e)
      cb(e)
    }

    const transformed = e => {
      if (/transform/.test(e.propertyName)) {
        this.removeTransitionListener()
        this.props.onTransitionEnd(e)
        this.removeTransitionListener = addEventListener(this.bg.current, 'transitionend', finished)
      }
    }

    this.removeTransitionListener = addEventListener(node, 'transitionend', transformed)
  }

  getBackgroundStyle() {
    const {
      opacity,
      scale,
    } = this.props
    const { entering } = this.state

    return {
      opacity: entering ? opacity : 0,
      transform: `scale(${ scale })`,
      transitionDuration: '250ms',
      transitionProperty: 'opacity',
      transitionTimingFunction: 'linear',
    }
  }

  getForegroundStyle() {
    const {
      duration,
      end,
      opacity,
      scale,
      size,
      start,
    } = this.props
    const {
      entering,
      exiting,
    } = this.state

    const transform = entering || exiting
      ? `translate(${ end.left }px, ${ end.top }px) scale(${ scale })`
      : `translate(${ start.left }px, ${ start.top }px) scale(1)`

    return {
      height: size,
      opacity: entering ? opacity : 0,
      transform,
      transitionDelay: 0,
      transitionDuration: exiting ? '83ms' : `${ duration }ms, 83ms`,
      transitionProperty: exiting ? 'opacity' : 'transform, opacity',
      transitionTimingFunction: exiting ? 'linear' : 'cubic-bezier(0.4, 0, 0.2, 1), linear',
      width: size,
    }
  }

  handleEnter(node) {
    // Force a repaint when the node enters the DOM, or else new styles aren't
    // applied.
    // eslint-disable-next-line babel/no-unused-expressions
    node.scrollTop
    this.setState({ entering: true, exiting: false })
  }

  handleExit() {
    this.setState({ entering: false, exiting: true })
  }

  render() {
    const {
      duration,
      end: _end,
      onExited: _onExited,
      onTransitionEnd: _onTransitionEnd,
      opacity: _opacity,
      scale: _scale,
      size: _size,
      start: _start,
      ...props
    } = this.props

    return (
      <Transition
        addEndListener={ this.endListener }
        timeout={ duration }
        onEnter={ this.handleEnter }
        onExit={ this.handleExit }
        { ...props }>
        <Root>
          <Background ref={ this.bg } style={ this.getBackgroundStyle() } />
          <Foreground style={ this.getForegroundStyle() } />
        </Root>
      </Transition>
    )
  }
}

export default Ripple
