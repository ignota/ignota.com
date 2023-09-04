import React, { PureComponent } from 'react'
import { BaseP } from './styled-paragraph'

class Paragraph extends PureComponent {
  static defaultProps = {
    align: 'justify',
  }

  render() {
    const {
      align,
      children,
      flush,
      indent,
      ...props
    } = this.props

    return (
      <BaseP
        align={ align }
        flush={ flush }
        indent={ indent }
        { ...props }>
        { children }
      </BaseP>
    )
  }
}

export default Paragraph
