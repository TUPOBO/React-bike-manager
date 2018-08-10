import React, { Component } from 'react'
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Home from './pages/home'
import Admin from './admin'
import Buttons from './pages/ui/buttons'
import NoMatch from './pages/nomatch'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loading'
import Notices from './pages/ui/notice'
import Messages from './pages/ui/messages'
import Tab from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousels from './pages/ui/carousel'
import FormLogin from './pages/form/login'
import FormRegister from './pages/form/register'
import BasicTable from './pages/table/basicTable'
import HighTable from './pages/table/highTable'
import City from './pages/city'
import Order from './pages/order'
import Common from './common'
import Detail from './pages/order/detail'
import User from './pages/user'
import BikeMap from './pages/map/bikeMap'
import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Line from './pages/echarts/line'
import RichText from './pages/rich'
import PermissionUser from './pages/permission'
// import Home from './pages/home'

class IRouter extends Component {
  render () {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/common' render={() => (
              <Common>
                <Route path='/common/order/detail/:orderId' component={Detail} />
              </Common>
            )} />
            <Route path='/' render={() => (
              <Admin>
                <Switch>
                  <Route path='/home' component={Home} />
                  <Route path='/ui/buttons' component={Buttons} />
                  <Route path='/ui/modals' component={Modals} />
                  <Route path='/ui/loadings' component={Loadings} />
                  <Route path='/ui/notification' component={Notices} />
                  <Route path='/ui/messages' component={Messages} />
                  <Route path='/ui/tabs' component={Tab} />
                  <Route path='/ui/gallery' component={Gallery} />
                  <Route path='/ui/carousel' component={Carousels} />
                  <Route path='/form/login' component={FormLogin} />
                  <Route path='/form/reg' component={FormRegister} />
                  <Route path='/table/basic' component={BasicTable} />
                  <Route path='/table/high' component={HighTable} />
                  <Route path='/city' component={City} />
                  <Route path='/order' component={Order} />
                  <Route path='/user' component={User} />
                  <Route path='/bikeMap' component={BikeMap} />
                  <Route path='/charts/bar' component={Bar} />
                  <Route path='/charts/pie' component={Pie} />
                  <Route path='/charts/line' component={Line} />
                  <Route path='/rich' component={RichText} />
                  <Route path='/permission' component={PermissionUser} />
                  <Route component={NoMatch} />
                  <Redirect to='/home' />
                </Switch>
              </Admin>
            )} />
          </Switch>

        </App>
      </HashRouter>
    )
  }
}

export default IRouter
