import {
  Error,
  Root,
  Spinner,
} from './styled-loading'
import React, { PureComponent } from 'react'
import Button from '../button'

class Loading extends PureComponent {
  render() {
    const {
      error,
    } = this.props

    if (error) {
      return (
        <Root>
          <Spinner />
          <div>
            <Error>Error:</Error> { error.message }
          </div>
          <Button to='mailto:help@ignota.com'>Contact Support</Button>
          <pre>
            <code>
              { error.stack }
            </code>
          </pre>
        </Root>
      )
    }

    return (
      <Root>
        <Spinner />
      </Root>
    )
  }
}

export default Loading
