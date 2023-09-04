import {
  Decorator,
  ListBase,
} from './styled-list'
import React, { Children, PureComponent } from 'react'

class List extends PureComponent {
  static defaultProps = {
    color: 'black',
    start: 0,
    style: 'number',
  }

  render() {
    const {
      children,
      color,
      start,
      style,
      ...props
    } = this.props

    const as = style === 'number'
      ? 'ol'
      : 'ul'

    const decoratedChildren = Children.map(children, (child, idx) =>
      React.cloneElement(child, {
        decorator: style === 'number'
          ? <Decorator hasNumber decoratorColor={ color }>{ idx + start }</Decorator>
          : <Decorator decoratorColor={ color } />,
        hasNumber: style === 'number',
      }),
    )

    return (
      <ListBase as={ as } { ...props }>
        { decoratedChildren }
      </ListBase>
    )
  }
}

export default List
