import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import Admin from './pages/Admin';
import Customer from './pages/Customer';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className='text-center italic text-2xl my-2'>
        <p>Minimal Banking App</p>
      </div>
      <div className='mx-auto max-w-xl'>
        <Switch>
          <Route path='/' exact>
            <Login />
          </Route>

          <Route path='/admin'>
            <Admin />
          </Route>

          <Route path='/customer'>
            <Customer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
