import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/views/Dashboard'
import Expenses from './components/views/Expenses'
import Report from './components/views/Report'

const App = () => {

  const [authToken, setAuthToken] = useState(null)

  const authHandler = (token) => {
    setAuthToken(token)
  }

  return (
    <div style={{width: window.innerWidth, height: window.innerHeight}}>
      <Router>
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route exact path='/login' component={() => <Login authHandler={authHandler}/>}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/dashboard' component={() => <Dashboard authToken={authToken}/>}/>
          <Route exact path='/expenses' component={() => <Expenses authToken={authToken}/>}/>
          <Route exact path='/report' component={() => <Report authToken={authToken}/>}/>
        </Switch>
      </Router>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
