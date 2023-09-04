import React, { PureComponent } from 'react'
import Aside from '../aside'
import { Figure } from './styled-pull-media'

class PullMedia extends PureComponent {
  static defaultProps = {
    float: 'center',
  }

  render() {
    const {
      children,
      float,
      ...props
    } = this.props

    return (
      <Aside float={ float } { ...props }>
        <Figure>
          { children }
        </Figure>
      </Aside>
    )
  }
}

export default PullMedia
