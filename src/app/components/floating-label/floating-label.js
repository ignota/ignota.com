import React, { PureComponent } from 'react'
import { addEventListener } from 'consolidated-events'
import { Label } from './styled-floating-label'
import { withFormControl } from '../form-control'

@withFormControl()
class FloatingLabel extends PureComponent {
  static defaultProps = {
    color: 'primary',
  }

  label = React.createRef()

  state = {
    shaking: false,
  }

  componentWillUnmount() {
    if (this.removeAnimationListener) this.removeAnimationListener()
  }

  shake() {
    this.removeAnimationListener = addEventListener(this.label.current, 'animationend', this.handleShakeEnd)
    this.setState({ shaking: true })
  }

  handleShakeEnd() {
    this.removeAnimationListener()
    this.removeAnimationListener = null
    this.setState({ shaking: false })
  }

  render() {
    const {
      children,
      color,
      disabled,
      filled,
      focused,
      ...props
    } = this.props
    const { shaking } = this.state

    return (
      <Label
        active={ focused }
        disabled={ disabled }
        float={ focused || filled }
        labelColor={ color }
        ref={ this.label }
        shake={ shaking }
        { ...props }>
        { children }
      </Label>
    )
  }
}

export default FloatingLabel
