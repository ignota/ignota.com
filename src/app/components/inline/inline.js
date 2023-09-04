import React, { PureComponent } from 'react'
import { SmallCaps, Underline } from './styled-inline'

const COMPONENT_MAP = {
  bold: 'strong',
  italic: 'em',
  small: SmallCaps,
  underline: Underline,
}

class Inline extends PureComponent {
  render() {
    const {
      children,
      style,
      ...props
    } = this.props

    const Component = COMPONENT_MAP[style]

    return (
      <Component { ...props }>
        { children }
      </Component>
    )
  }
}

export default Inline
