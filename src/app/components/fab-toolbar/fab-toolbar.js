import {
  Action,
  Actions,
  Background,
  Icon,
  Root,
  Trigger,
  Wrapper,
} from './styled-fab-toolbar'
import React, { Children, PureComponent } from 'react'
import R from 'ramda'
import ReactDOM from 'react-dom'

class FABToolbar extends PureComponent {
  static defaultProps = {
    onToggle: R.identity,
  }

  state = {
    triggerHeight: 0,
    triggerWidth: 0,
    wrapperWidth: 0,
  }

  trigger = React.createRef()

  wrapper = React.createRef()

  componentDidMount() {
    const triggerNode = ReactDOM.findDOMNode(this.trigger.current)

    if (!triggerNode || !this.wrapper.current) return

    const { offsetWidth: wrapperWidth } = this.wrapper.current
    const { offsetHeight: triggerHeight, offsetWidth: triggerWidth } = triggerNode

    this.setState({
      triggerHeight,
      triggerWidth,
      wrapperWidth,
    })
  }

  handleToggle(e) {
    e.stopPropagation()
    e.preventDefault()

    this.props.onToggle(e)
  }

  render() {
    const {
      children,
      color,
      direction,
      icon,
      onToggle: _onToggle,
      open,
      ...props
    } = this.props
    const {
      triggerHeight,
      triggerWidth,
      wrapperWidth,
    } = this.state

    const backgroundScale = 2 * (wrapperWidth / triggerWidth)
    const backgroundStyle = {
      borderRadius: wrapperWidth,
      height: triggerHeight,
      width: triggerWidth,
    }

    const childArray = Children.toArray(children).filter(React.isValidElement)
    const childCount = childArray.length
    const staggeredChildren = childArray.map((child, index) => {
      const transitionDelay = do {
        if (open && direction === 'right') {
          `${ (index + 1) * 50 }ms`
        } else if (open && direction === 'left') {
          `${ (childCount - index) * 50 }ms`
        } else if (direction === 'right') {
          `${ 200 + ((childCount - index) * 50) }`
        } else {
          `${ 200 + index * 50 }ms`
        }
      }

      return (
        <Action key={ index } open={ open } style={{ transitionDelay }}>
          { child }
        </Action>
      )
    })

    return (
      <Root { ...props }>
        <Wrapper open={ open } ref={ this.wrapper } onClick={ this.handleToggle }>
          <Trigger mini color={ color } direction={ direction } open={ open } ref={ this.trigger } onClick={ this.handleToggle }>
            { icon && <Icon use={ icon } /> }
            <Background backgroundScale={ backgroundScale } color={ color } open={ open } style={ backgroundStyle } />
          </Trigger>
          <Actions direction={ direction }>
            { staggeredChildren }
          </Actions>
        </Wrapper>
      </Root>
    )
  }
}

export default FABToolbar
