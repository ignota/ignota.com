import React, { PureComponent } from 'react'
import { MenuConsumer } from './menu-provider'
import { Scrim } from './styled-menu-background'

class MenuBackground extends PureComponent {
  render() {
    return (
      <MenuConsumer>
        { ({ open }) => (
          <Scrim open={ open } />
        ) }
      </MenuConsumer>
    )
  }
}

export default MenuBackground
