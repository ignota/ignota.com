import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router'
import Main from '../main'
import Page from '../page'
import Tag from '../tag'

class TagsRouter extends PureComponent {
  render() {
    const {
      match: {
        path,
      },
    } = this.props

    return (
      <Switch>
        <Route exact component={ Main } path={ path } />
        <Route component={ Page } path={ `${ path }/page/:cursor` } />
        <Route component={ Tag } path={ `${ path }/:slug` } />
      </Switch>
    )
  }
}

export default TagsRouter
