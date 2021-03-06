import React, { Component } from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import Home from './Home'
import Main from '../route1/Main'
import About from '../route1/about'
import Topic from '../route1/topic'
class IRouter extends Component {
  render () {
    return (
      <Router>
        <Home>
          <Route exact path='/' component={Main} />
          <Route path='/about' component={About} />
          <Route path='/topics' component={Topic} />
        </Home>
      </Router>
    )
  }
}

export default IRouter
