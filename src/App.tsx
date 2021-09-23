import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import Admin from './pages/Admin';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className='text-center'>
        <p>Minimal Banking App</p>
      </div>

      <Switch>
        <Route path='/' exact>
          <Login/>
        </Route>

        <Route path='/admin'>
          <Admin/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
