import {
  Background,
  EmbedContainer,
  Popout,
  PopoutChildren,
} from './styled-annotation-popout'
import {
  Power0,
  TimelineLite,
  TweenLite,
} from 'gsap'
import React, { PureComponent } from 'react'
import { canUseDOM } from 'exenv'
import R from 'ramda'
import ReactDOM from 'react-dom'
import { Transition } from 'react-transition-group'

let SCROLL_LOCKS = 0

class AnnotationPopout extends PureComponent {
  popout = React.createRef()

  constructor(props) {
    super(props)

    if (canUseDOM) {
      this.root = document.createElement('div')
      // Q.v. <https://github.com/facebook/react/issues/11918>.
      this.root.onclick = R.identity
      document.body.appendChild(this.root)
    }
  }

  componentWillUnmount() {
    if (this.locked) this.unlockScroll()
    document.body.removeChild(this.root)
  }

  getInitialTween() {
    const { triggerRect } = this.props
    const popoutRect = this.popout.current.getBoundingClientRect()

    const x = triggerRect.left - popoutRect.left
    const y = triggerRect.top - popoutRect.top
    const scaleX = triggerRect.width / popoutRect.width
    const scaleY = triggerRect.height / popoutRect.height

    return {
      scaleX,
      scaleY,
      x,
      y,
    }
  }

  handleAnnotationEnter(node) {
    const initial = this.getInitialTween()
    TweenLite.fromTo(node, 0.3, { ...initial, alpha: 0 }, { alpha: 1, ease: 'material-enter', scaleX: 1, scaleY: 1, x: 0, y: 0 })
    this.lockScroll()
  }

  handleAnnotationExit(node) {
    const initial = this.getInitialTween()

    const tl = new TimelineLite()
    tl.add(TweenLite.to(node, 0.4, { ...initial, ease: 'material-exit' }))
    tl.add(TweenLite.to(node, 0.1, { alpha: 0, ease: 'material-exit' }), 0.3)

    this.unlockScroll()
  }

  handleBackgroundEnter(node) {
    TweenLite.fromTo(node, 0.3, { alpha: 0 }, { alpha: 1, ease: Power0.easeOut })
  }

  handleBackgroundExit(node) {
    TweenLite.to(node, 0.4, { alpha: 0, ease: Power0.easeOut })
  }

  handleImageEnter(node) {
    if (!window.matchMedia('(min-width: 48rem)').matches) {
      TweenLite.fromTo(node, 0.3, { alpha: 0, ease: 'material-enter', y: '-100%' }, { alpha: 1, ease: 'material-enter', y: '0%' })
      return
    }

    switch (this.props.alignment) {
      case 'bottom':
        TweenLite.fromTo(node, 0.3, { alpha: 0, ease: 'material-enter', y: '-100%' }, { alpha: 1, ease: 'material-enter', y: '0%' })
        break

      case 'left':
        TweenLite.fromTo(node, 0.3, { alpha: 0, ease: 'material-enter', x: '100%' }, { alpha: 1, ease: 'material-enter', x: '0%' })
        break

      case 'right':
        TweenLite.fromTo(node, 0.3, { alpha: 0, ease: 'material-enter', x: '-100%' }, { alpha: 1, ease: 'material-enter', x: '0%' })
        break

      case 'top':
        TweenLite.fromTo(node, 0.3, { alpha: 0, ease: 'material-enter', y: '100%' }, { alpha: 1, ease: 'material-enter', y: '0%' })
        break
    }
  }

  handleImageExit(node) {
    if (!window.matchMedia('(min-width: 48rem)').matches) {
      TweenLite.to(node, 0.4, { alpha: 0, ease: 'material-enter', y: '-100%' })
      return
    }

    switch (this.props.alignment) {
      case 'bottom':
        TweenLite.to(node, 0.4, { alpha: 0, ease: 'material-exit', y: '-100%' })
        break

      case 'left':
        TweenLite.to(node, 0.4, { alpha: 0, ease: 'material-exit', x: '100%' })
        break

      case 'right':
        TweenLite.to(node, 0.4, { alpha: 0, ease: 'material-exit', x: '-100%' })
        break

      case 'top':
        TweenLite.to(node, 0.4, { alpha: 0, ease: 'material-exit', y: '100%' })
        break
    }
  }

  lockScroll() {
    this.scrollTop = window.pageYOffset == null
      ? document.documentElement.scrollTop
      : window.pageYOffset

    const { style } = document.documentElement

    style.overflow = 'hidden'
    SCROLL_LOCKS++

    this.locked = true
  }

  unlockScroll() {
    const { style } = document.documentElement

    SCROLL_LOCKS--

    if (SCROLL_LOCKS === 0) {
      style.overflow = null
      window.scrollTo(0, this.scrollTop)
    }

    this.locked = false
  }

  renderAnnotation() {
    const {
      alignment,
      children,
      color,
      embed,
      open,
    } = this.props

    return (
      <React.Fragment>
        <Transition mountOnEnter unmountOnExit in={ open } timeout={{ enter: 300, exit: 400 }} onEnter={ this.handleBackgroundEnter } onExit={ this.handleBackgroundExit }>
          <Background />
        </Transition>
        <Transition mountOnEnter unmountOnExit in={ open } timeout={{ enter: 300, exit: 400 }} onEnter={ this.handleAnnotationEnter } onExit={ this.handleAnnotationExit }>
          <Popout alignment={ alignment } color={ color } ref={ this.popout }>
            <PopoutChildren>
              { children }
            </PopoutChildren>
          </Popout>
        </Transition>
        { embed &&
            <Transition mountOnEnter unmountOnExit in={ open } timeout={{ enter: 300, exit: 400 }} onEnter={ this.handleImageEnter } onExit={ this.handleImageExit }>
              <EmbedContainer alignment={ alignment }>
                { embed }
              </EmbedContainer>
            </Transition>
        }
      </React.Fragment>
    )
  }

  render() {
    if (!canUseDOM) {
      return null
    }

    return ReactDOM.createPortal(
      this.renderAnnotation(),
      this.root,
    )
  }
}

export default AnnotationPopout
