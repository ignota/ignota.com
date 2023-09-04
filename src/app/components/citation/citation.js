import React, { PureComponent } from 'react'
import { Root } from './styled-citation'

class Citation extends PureComponent {
  static defaultProps = {
    alignment: 'right',
  }

  render() {
    const {
      alignment,
      children,
      ...props
    } = this.props

    return (
      <Root alignment={ alignment } { ...props }>
        { children }
      </Root>
    )
  }
}

export default Citation
