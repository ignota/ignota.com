import {
  LI,
  UL,
} from './styled-qa'
import React, { Children } from 'react'

class QA extends React.PureComponent {
  chunkChildren(children) {
    return Children.toArray(children)
      .filter(Boolean)
      .map((child, idx) => {
        return (
          <LI key={ idx }>
            { child }
          </LI>
        )
      })
  }

  render() {
    const {
      children,
      ...props
    } = this.props

    return (
      <UL { ...props }>
        { this.chunkChildren(children) }
      </UL>
    )
  }
}

export default QA
