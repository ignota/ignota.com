import React, { Children, PureComponent } from 'react'
import _ from 'lodash'
import { addEventListener } from 'consolidated-events'
import { findDOMNode } from 'react-dom'

class Listener extends PureComponent {
  static defaultEventOptions = {
    capture: false,
    passive: false,
  }

  componentDidMount() {
    this.addListeners()
  }

  getSnapshotBeforeUpdate() {
    this.removeListeners()
    return null
  }

  componentDidUpdate() {
    this.addListeners()
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  child = React.createRef()

  listeners = {}

  addListeners() {
    this.applyListeners(this.on)
  }

  applyListeners(onOrOff) {
    const { target } = this.props

    if (target) {
      const element = _.isString(target) ? window[target] : target
      this.forEachListener(onOrOff.bind(null, element))
    } else if (this.child.current) {
      const childNode = findDOMNode(this.child.current)
      this.forEachListener(onOrOff.bind(null, childNode))
    }
  }

  forEachListener(iteratee) {
    const {
      children: _children,
      target: _target,
      ...eventProps
    } = this.props

    Object.keys(eventProps).forEach(name => {
      if (name.substring(0, 2) !== 'on') {
        return
      }

      const prop = eventProps[name]
      const isObject = _.isObjectLike(prop)
      const isFunction = _.isFunction(prop)

      if (!isObject && !isFunction) {
        return
      }

      const capture = name.toLowerCase().includes('capture')
      const passive = name.toLowerCase().includes('passive')
      const eventName = name.substring(2).toLowerCase().replace('capture', '').replace('passive', '')

      if (isObject) {
        iteratee(eventName, prop.handler, prop.options)
      } else {
        iteratee(eventName, prop, {
          ...Listener.defaultEventOptions,
          capture,
          passive,
        })
      }
    })
  }

  off(_target, eventName) {
    const unsubscribe = this.listeners[eventName]
    unsubscribe()
    delete this.listeners[eventName]
  }

  on(target, eventName, handler, options) {
    const unsubscribe = addEventListener(target, eventName, handler, options)
    this.listeners[eventName] = unsubscribe
  }

  removeListeners() {
    this.applyListeners(this.off)
  }

  render() {
    const { children } = this.props

    if (children == null) return null

    const onlyChild = Children.only(children)
    return React.cloneElement(onlyChild, { ref: this.child })
  }
}

export default Listener
