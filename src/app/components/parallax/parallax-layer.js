import React, { PureComponent } from 'react'
import _ from 'lodash/fp'
import { findDOMNode } from 'react-dom'
import makeTimeline from './make-timeline'
import PropTypes from 'prop-types'

class ParallaxLayer extends PureComponent {
  static contextTypes = {
    timelines: PropTypes.array,
  }

  childRefs = []

  componentDidMount() {
    this.registerTimeline()
  }

  registerTimeline() {
    const { selector, keyframes } = this.props

    const nodes = this.childRefs
      .map(findDOMNode)
      .filter(Boolean)

    const targetEl = _.flatMap(
      n => selector ? n.querySelectorAll(selector) : n, nodes,
    )

    this.timeline = makeTimeline(keyframes, targetEl)
    this.context.timelines.push(this.timeline)
  }

  render() {
    const {
      children,
      selector: _selector,
      keyframes: _keyframes,
      ...props
    } = this.props

    return React.Children.map(
      children,
      child => React.cloneElement(child, {
        ref: node => {
          if (node && !this.childRefs.includes(node)) {
            this.childRefs.push(node)
          }

          if (typeof child.ref === 'function') {
            child.ref(node)
          }
        },
        ...props,
      }),
    )
  }
}

export default ParallaxLayer
