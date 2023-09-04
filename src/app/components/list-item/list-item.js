import {
  Children,
  Root,
} from './styled-list-item'
import React, { PureComponent } from 'react'

class ListItem extends PureComponent {
  render() {
    const {
      children,
      decorator,
      hasNumber,
      ...props
    } = this.props

    return (
      <Root { ...props }>
        { decorator }
        <Children hasNumber={ hasNumber }>
          { children }
        </Children>
      </Root>
    )
  }
}

export default ListItem
