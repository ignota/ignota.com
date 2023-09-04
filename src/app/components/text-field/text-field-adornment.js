import React, { PureComponent } from 'react'
import { I } from './styled-text-field-adornment'
import { withFormControl } from '../form-control'

@withFormControl()
class TextFieldAdornment extends PureComponent {
  render() {
    const {
      children,
      color,
      disabled,
      error,
      focused,
      onEmpty: _onEmpty,
      onFill: _onFill,
      onClick,
      ...props
    } = this.props

    return (
      <I
        color={ color }
        disabled={ disabled }
        error={ error }
        focused={ focused }
        hasAction={ !!onClick }
        onClick={ onClick }
        { ...props }>
        { children }
      </I>
    )
  }
}

export default TextFieldAdornment
