import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import App from './App'
// import Life from './pages/demo/Life'
// import Admin from './admin'
import Index from './pages/route_demo/route2'
// import {BrowserRouter} from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Index />,
  document.getElementById('root'))
registerServiceWorker()
