import {
  Logo,
  Root,
  Strut,
} from './styled-main-toolbar'
import React, { PureComponent } from 'react'
import { ButtonBase } from '../button'

class MainToolbar extends PureComponent {
  render() {
    return (
      <Root>
        <ButtonBase disableRipple style={{ height: '100%' }} to='/'>
          <Logo />
        </ButtonBase>
        <Strut />
      </Root>
    )
  }
}

export default MainToolbar
