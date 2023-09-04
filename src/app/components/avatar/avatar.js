import {
  Image,
  Root,
} from './styled-avatar'
import React, { PureComponent } from 'react'

class Avatar extends PureComponent {
  static defaultProps = {
    color: 'accent',
  }

  render() {
    const {
      alt,
      children: childrenProp,
      color,
      src,
      ...props
    } = this.props

    let children = null
    if (src) {
      children = (
        <Image alt={ alt } src={ src } />
      )
    } else {
      children = childrenProp
    }

    return (
      <Root bg={ color } { ...props }>
        { children }
      </Root>
    )
  }
}

export default Avatar
