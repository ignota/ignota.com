import React, { PureComponent } from 'react'
import Loading from 'app/components/loading'
import MainToolbar from 'app/components/main-toolbar'

class TagsPage extends PureComponent {
  render() {
    return (
      <>
        <MainToolbar />
        <Loading pastDelay />
      </>
    )
  }
}

export default TagsPage
