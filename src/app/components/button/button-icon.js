import React, { PureComponent } from 'react'
import { Icon } from './styled-button-icon'

class ButtonIcon extends PureComponent {
  render() {
    const {
      use: Component,
      ...props
    } = this.props

    return (
      <Icon { ...props }>
        <Component />
      </Icon>
    )
  }
}

export default ButtonIcon
