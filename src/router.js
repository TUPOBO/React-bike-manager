import React, { Component } from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './admin'
import Buttons from './pages/ui/buttons'
import NoMatch from './pages/nomatch'
// import Home from './pages/home'

class IRouter extends Component {
  render () {
    return (
      <HashRouter>
        <App>
          <Route path='/login' component={Login} />
          <Route path='/admin' render={() => (
            <Admin>
              <Switch>
                <Route path='/admin/ui/buttons' component={Buttons} />
                {/* <Route path='/admin' component={Home} /> */}
                <Route component={NoMatch} />
              </Switch>
            </Admin>
          )} />
          <Route path='/order/detail' component={Login} />
        </App>
      </HashRouter>
    )
  }
}

export default IRouter
