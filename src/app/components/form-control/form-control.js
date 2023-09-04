import React, { PureComponent } from 'react'

export const {
  Consumer: FormControlConsumer,
  Provider: FormControlProvider,
} = React.createContext({})

class FormControl extends PureComponent {
  static defaultProps = {
    color: 'primary',
  }

  state = {
    filled: false,
    focused: false,
  }

  handleBlur(e) {
    if (this.props.onBlur && e) {
      this.props.onBlur(e)
    }

    this.setState(state => state.focused ? { focused: false } : null)
  }

  handleEmpty() {
    this.setState(state => state.filled ? { filled: false } : null)
  }

  handleFill() {
    this.setState(state => state.filled ? null : { filled: true })
  }

  handleFocus(e) {
    if (this.props.onFocus && e) {
      this.props.onFocus(e)
    }

    this.setState(state => state.focused ? null : { focused: true })
  }

  render() {
    const {
      children,
      onBlur: _onBlur,
      onFocus: _onFocus,
      ...props
    } = this.props

    return (
      <FormControlProvider
        value={{
          ...props,
          ...this.state,
          onBlur: this.handleBlur,
          onEmpty: this.handleEmpty,
          onFill: this.handleFill,
          onFocus: this.handleFocus,
        }}>
        { children }
      </FormControlProvider>
    )
  }
}

export default FormControl
