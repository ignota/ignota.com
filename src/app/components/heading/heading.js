import React, { PureComponent } from 'react'
import { Header } from './styled-heading'

class Heading extends PureComponent {
  static defaultProps = {
    size: 1,
  }

  render() {
    const {
      primary,
      children,
      size,
      ...props
    } = this.props

    return (
      <Header
        as={ `h${ size }` }
        primary={ primary }
        size={ size }
        { ...props }>
        { children }
      </Header>
    )
  }
}

export default Heading
