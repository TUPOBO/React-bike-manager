import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import App from './App'
// import Life from './pages/demo/Life'
// import Admin from './admin'
// import IRouter from './pages/route_demo/route2/IRouter'
// import {BrowserRouter} from 'react-router-dom'
import Router from './router'

import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Router />,
  document.getElementById('root'))
registerServiceWorker()
