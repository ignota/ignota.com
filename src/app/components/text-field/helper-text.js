import React, { PureComponent } from 'react'
import { Text } from './styled-helper-text'
import { withFormControl } from '../form-control'

@withFormControl()
class HelperText extends PureComponent {
  render() {
    const {
      children,
      error,
      persistent,
    } = this.props

    return (
      <Text invalid={ error } persistent={ persistent }>
        { children }
      </Text>
    )
  }
}

export default HelperText
