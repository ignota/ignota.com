import React, { PureComponent } from 'react'
import Loading from 'app/components/loading'
import MainToolbar from 'app/components/main-toolbar'

class Terms extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <MainToolbar />
        <Loading pastDelay />
      </React.Fragment>
    )
  }
}

export default Terms
