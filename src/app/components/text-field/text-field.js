import {
  Input,
  Root,
} from './styled-text-field'
import React, { PureComponent } from 'react'
import _ from 'lodash'
import FloatingLabel from '../floating-label'
import LineRipple from './line-ripple'
import Placeholder from './placeholder'
import R from 'ramda'
import { withFormControl } from '../form-control'

@withFormControl()
class TextField extends PureComponent {
  static defaultProps = {
    color: 'primary',
    inputRef: _.noop,
    onChange: _.noop,
    onClick: _.noop,
    type: 'text',
  }

  state = {
    clickOrigin: 0,
    filled: this.props.filled || this.props.value != null,
    focused: this.props.focused,
    value: this.props.value || '',
  }

  componentDidMount() {
    this.checkDirty(this.input)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.disabled && nextProps.disabled) {
      this.setState({ focused: false })
    }

    if (nextProps.value != null && this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value })
    }
  }

  componentWillUpdate(nextProps) {
    this.checkDirty(nextProps)

    if (!this.props.disabled && nextProps.disabled && nextProps.onBlur) {
      nextProps.onBlur()
    }
  }

  checkDirty(obj) {
    if (
      obj &&
          obj.value != null &&
          obj.value !== ''
    ) {
      if (this.props.onFill) {
        this.props.onFill()
        this.setState({ value: obj.value })
      } else {
        this.setState({
          filled: true,
          value: obj.value,
        })
      }

      return
    }

    if (this.props.onEmpty) {
      this.props.onEmpty()
      this.setState({ value: '' })
    } else {
      this.setState({
        filled: false,
        value: '',
      })
    }
  }

  handleBlur(e) {
    if (this.props.onBlur) {
      this.props.onBlur(e)
      return
    }

    this.setState({
      clickOrigin: 0,
      focused: false,
    })
  }

  handleChange(e) {
    this.props.onChange(e)

    this.checkDirty(e.target)
  }

  handleClick(e) {
    if (this.props.disabled) {
      e.stopPropagation()
      return
    }

    this.props.onClick(e)

    const targetClientRect = e.target.getBoundingClientRect()
    const normalizedX = e.clientX - targetClientRect.left

    this.setState({
      clickOrigin: normalizedX,
      focused: true,
    })
  }

  handleFocus(e) {
    if (this.props.disabled) {
      e.stopPropagation()
      return
    }

    if (this.props.onFocus) {
      this.props.onFocus(e)
    }
  }

  inputRef(input) {
    this.input = input
    this.props.inputRef(input)
    if (this.props.inputProps && this.props.inputProps.ref) {
      this.props.inputProps.ref(input)
    }
  }

  render() {
    const {
      autoComplete,
      autoFocus,
      color,
      disabled,
      endAdornment,
      error,
      filled: filledProp,
      focused: focusedProp,
      fullWidth,
      id,
      inputComponent,
      inputProps,
      inputRef: _inputRef,
      label,
      name,
      onBlur: _onBlur,
      onChange: _onChange,
      onClick: _onClick,
      onEmpty: _onEmpty,
      onFill: _onFill,
      onFocus: _onFocus,
      placeholder,
      readOnly,
      startAdornment,
      type,
      value: _value,
      ...props
    } = this.props
    const {
      clickOrigin,
      filled: filledState,
      focused: focusedState,
      value,
    } = this.state

    const filled = R.isNil(filledProp) ? filledState : filledProp
    const focused = R.isNil(focusedProp) ? focusedState : focusedProp

    return (
      <Root { ...props }>
        { startAdornment }
        <Input
          as={ inputComponent }
          autoComplete={ autoComplete }
          autoFocus={ autoFocus }
          disabled={ disabled }
          error={ error }
          fullWidth={ fullWidth }
          id={ id }
          name={ name }
          readOnly={ readOnly }
          ref={ this.inputRef }
          type={ type }
          value={ value }
          onBlur={ this.handleBlur }
          onChange={ this.handleChange }
          onClick={ this.handleClick }
          onFocus={ this.handleFocus }
          { ...inputProps } />
        { placeholder &&
                  <Placeholder active={ focused && !filled }>
                    { placeholder }
                  </Placeholder>
        }
        { label &&
            <FloatingLabel
              color={ color }
              filled={ filled }
              focused={ focused }
              ref={ label => this.label = label }>
              { label }
            </FloatingLabel>
        }
        { !disabled && <LineRipple active={ focused } center={ clickOrigin } error={ error } lineColor={ color } /> }
        { endAdornment }
      </Root>
    )
  }
}

export default TextField
