import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router'
import Author from '../author'
import Main from '../main'
import Page from '../page'

class AuthorsRouter extends PureComponent {
  render() {
    const {
      match: { path },
    } = this.props

    return (
      <Switch>
        <Route exact component={ Main } path={ path } />
        <Route component={ Page } path={ `${ path }/page/:cursor` } />
        <Route component={ Author } path={ `${ path }/:slug` } />
      </Switch>
    )
  }
}

export default AuthorsRouter
