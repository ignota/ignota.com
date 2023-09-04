import React, { PureComponent } from 'react'
import Aside from '../aside'
import { Quotation } from './styled-pull-quote'

class PullQuote extends PureComponent {
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
        <Quotation float={ float }>
          { children }
        </Quotation>
      </Aside>
    )
  }
}

export default PullQuote
