import React, { PureComponent } from 'react'
import { FormControlConsumer } from './form-control'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { wrapDisplayName } from 'recompose'

const withFormControl = () => Component => {
  class WithFormControl extends PureComponent {
    static displayName = wrapDisplayName(Component, 'withFormControl')

    render() {
      return (
        <FormControlConsumer>
          { props => <Component { ...props } { ...this.props } /> }
        </FormControlConsumer>
      )
    }
  }

  return hoistNonReactStatics(WithFormControl, Component)
}

export default withFormControl
