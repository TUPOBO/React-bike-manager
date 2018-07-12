import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import App from './App'
// import Life from './pages/demo/Life'
// import Admin from './admin'
import IRouter from './pages/route_demo/route2/IRouter'
// import {BrowserRouter} from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <IRouter />,
  document.getElementById('root'))
registerServiceWorker()
