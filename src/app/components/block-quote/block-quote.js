import {
  QuoteLeft,
  QuoteRight,
  Root,
} from './styled-block-quote'
import React, { PureComponent } from 'react'

class BlockQuote extends PureComponent {
  render() {
    const {
      children,
      ...props
    } = this.props

    return (
      <Root { ...props }>
        <QuoteLeft />
        { children }
        <QuoteRight />
      </Root>
    )
  }
}

export default BlockQuote
