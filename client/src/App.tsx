import * as React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Nav from '@/components/Nav/Container'
import Footer from '@/components/Footer/Container'

import routes from '@/config/router'

import 'antd/dist/antd.css'
import './app.scss'

const App = () => {
  return (
    <div className="app">
      <Router>
        <Nav />
        <main className="main">
          <Switch>
            {routes.map(route => (
              <Route exact key={route.path} path={route.path} component={route.component} />
            ))}
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App
