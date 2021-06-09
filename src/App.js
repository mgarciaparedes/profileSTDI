import React from 'react';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/body.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Profile from './components';


function App() {
  return (
    <Router>

    <div className="container mt-3">
      <div className="row">
        <div className="col-lg-12">
          <Switch>
            <Route path="/">
              <Profile/> 
            </Route>
          </Switch>
          
        
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
