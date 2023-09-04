import React, { PureComponent } from 'react'
import { A } from './styled-link'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import R from 'ramda'

@connect(
  null,
  { onPush: push },
)
class Link extends PureComponent {
  static defaultProps = {
    background: 'white',
    color: 'primary',
    onClick: R.identity,
  }

  handleClick(e) {
    const { onClick, onPush, to } = this.props

    onClick(e)

    if (e.defaultPrevented) return
    if (!to) return

    const href = to && (R.is(String, to)
      ? to
      : to.pathname)

    if (/(#|:)/.test(href)) return

    e.preventDefault()
    onPush(href)
  }

  render() {
    const {
      background,
      children,
      color,
      onClick: _onClick,
      onPush: _onPush,
      plain,
      popup,
      to,
      ...props
    } = this.props

    const href = to && (R.is(String, to)
      ? to
      : to.pathname)

    return (
      <A
        background={ background }
        color={ color }
        href={ href }
        plain={ plain }
        rel={ popup ? 'noopener noreferrer' : undefined }
        target={ popup ? '_blank' : undefined }
        onClick={ this.handleClick }
        { ...props }>
        { children }
      </A>
    )
  }
}

export default Link
