// @no-reflective-bind-babel

import React, { PureComponent } from 'react'
import FABToolbar from '../fab-toolbar'
import Listener from '../listener'
import { MenuConsumer } from './menu-provider'
import { MenuIcon } from 'mdi-react'
import R from 'ramda'

class Menu extends PureComponent {
  render() {
    const { children } = this.props

    return (
      <MenuConsumer>
        { ({ onToggle, open }) => (
            <>
                <FABToolbar color='brandGray' direction='left' icon={ MenuIcon } open={ open } onToggle={ onToggle }>
                  { children }
                </FABToolbar>
                <Listener target='document' onClick={ open ? onToggle : R.identity } />
            </>
        ) }
      </MenuConsumer>
    )
  }
}

export default Menu
