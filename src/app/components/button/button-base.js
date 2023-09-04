import React, { Children, PureComponent } from 'react'
import _ from 'lodash'
import { areComponentsEqual } from 'react-hot-loader'
import { Button } from './styled-button-base'
import ButtonIcon from './button-icon'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import R from 'ramda'
import Rippler from '../rippler'

@connect(
  null,
  { onPush: push },
)
class ButtonBase extends PureComponent {
  static defaultProps = {
    onClick: R.identity,
    onMouseDown: R.identity,
  }

  rippler = React.createRef()

  get href() {
    const { to } = this.props
    return to && (_.isString(to)
      ? to
      : to.pathname)
  }

  handleClick(e) {
    const {
      disabled,
      onClick,
      onPush,
    } = this.props

    if (disabled) return

    onClick(e)

    if (e.defaultPrevented) return
    if (/(^#|:)/.test(this.href)) return

    if (this.href) {
      e.preventDefault()
      onPush(this.href)
    }
  }

  handleMouseDown(e) {
    this.props.onMouseDown(e)
    if (e.defaultPrevented) return
      this.rippler.current?.trigger(e)
  }

  render() {
    const {
      children,
      className,
      component,
      disabled,
      disableRipple,
      onClick: _onClick,
      onMouseDown: _onMouseDown,
      onPush: _onPush,
      popup,
      style,
      to: _to,
    } = this.props

    let as
    if (component) {
      as = component
    } else if (this.href) {
      as = 'a'
    }

    let iconChildren = Children.toArray(children)
    iconChildren = iconChildren.map((child, idx) => {
      if (iconChildren.length === 1) {
        return child
      }

      if (
        idx === 0 &&
        React.isValidElement(child) &&
        typeof child.type === 'function' &&
        areComponentsEqual(child.type, ButtonIcon)
      ) {
        return React.cloneElement(child, { left: true })
      }
      if (
        idx === iconChildren.length - 1 &&
        React.isValidElement(child) &&
        typeof child.type === 'function' &&
        areComponentsEqual(child.type, ButtonIcon)
      ) {
        return React.cloneElement(child, { right: true })
      }

      return child
    })

    return (
      <Button
        as={ as }
        className={ className }
        disabled={ disabled }
        href={ this.href }
        rel={ popup ? 'noopener noreferrer' : undefined }
        style={ style }
        target={ popup ? '_blank' : undefined }
        onClick={ this.handleClick }
        onMouseDown={ this.handleMouseDown }>
        { iconChildren }
        { !disableRipple && <Rippler disabled={ disabled } ref={ this.rippler } /> }
      </Button>
    )
  }
}

export default ButtonBase
