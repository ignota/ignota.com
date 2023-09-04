import React, { PureComponent } from 'react'
import AnnotationPopout from './annotation-popout'
import { Trigger } from './styled-annotation'

class Annotation extends PureComponent {
  static defaultProps = {
    alignment: 'bottom',
  }

  state = {
    open: false,
    triggerRect: {
      height: 0,
      left: 0,
      top: 0,
      width: 0,
    },
  }

  trigger = React.createRef()

  handleTriggerClick(e) {
    e.preventDefault()
    e.stopPropagation()

    const { height, left, top, width } = this.trigger.current.getBoundingClientRect()
    const triggerRect = { height, left, top, width }

    this.setState({ open: !this.state.open, triggerRect })
  }

  render() {
    const {
      alignment,
      children,
      embed,
      color,
      trigger,
      ...props
    } = this.props
    const { open, triggerRect } = this.state

    return (
      <Trigger
        ref={ this.trigger }
        triggerColor={ color }
        onClick={ this.handleTriggerClick }
        { ...props }>
        <AnnotationPopout
          alignment={ alignment }
          color={ color }
          embed={ embed }
          open={ open }
          trigger={ trigger }
          triggerRect={ triggerRect }>
          { children }
        </AnnotationPopout>
        { trigger }
      </Trigger>
    )
  }
}

export default Annotation
