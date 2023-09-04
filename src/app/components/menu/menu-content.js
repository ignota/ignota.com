import React, { PureComponent } from 'react'
import { MenuConsumer } from './menu-provider'
import { Wrapper } from './styled-menu-content'

class MenuContent extends PureComponent {
  render() {
    const {
      children,
      ...props
    } = this.props

    return (
      <MenuConsumer>
        { ({ open }) => (
          <Wrapper open={ open } { ...props }>
            { children }
          </Wrapper>
        ) }
      </MenuConsumer>
    )
  }
}

export default MenuContent
