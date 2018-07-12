import React, { Component } from 'react'
import {HashRoute as Router, Route} from 'module'
import Main from '../route1/Main'
import About from '../route1/about'
import Topic from '../route1/topic'
import Home from './Home'
class Index extends Component {
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

export default Index
