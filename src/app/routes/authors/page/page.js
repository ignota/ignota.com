import React, { PureComponent } from 'react'
import Loading from 'app/components/loading'
import MainToolbar from 'app/components/main-toolbar'

class AuthorsPage extends PureComponent {
  render() {
    return (
      <>
        <MainToolbar />
        <Loading />
      </>
    )
  }
}

export default AuthorsPage
