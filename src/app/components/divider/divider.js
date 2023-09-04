import React, { PureComponent } from 'react'
import { HR } from './styled-divider'
import Logo from 'images/logo.svg'

class Divider extends PureComponent {
  render() {
    return (
      <HR>
        <Logo />
      </HR>
    )
  }
}

export default Divider
