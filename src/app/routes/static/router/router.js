import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router'
import Newsletter from '../newsletter'
import Showcase from '../showcase'
import Terms from '../terms'

class StaticRouter extends PureComponent {
  render() {
    return (
      <Switch>
        <Route component={ Newsletter } path='/newsletter' />
        <Route component={ Terms } path='/terms' />
        { __DEV__ && <Route component={ Showcase } path='/showcase' /> }
      </Switch>
    )
  }
}

export default StaticRouter
