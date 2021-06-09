import React from 'react';
import '../assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/body.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Profile from '../components';

/*Views*/
import {CreateYourProfile} from './views/CreateYourProfile/index';
import {Login} from './views/Login/index';
import {EditProfile} from './views/EditProfile/index';
import {ViewProfile} from './views/ViewProfile/index';

/*Componente para el manejo de rutas de la app*/
export const AppRoute = () => {
  return (
    <Router>

    <div className="container mt-3">
      <div className="row">
        <div className="col-lg-12">
          <Switch>
            <Route exact path="/">
              <Profile/> 
            </Route>
            <Route exact path="/login" component={() => <Login/> } />
            <Route exact path="/create-profile" component={() => <CreateYourProfile/> } />
            <Route exact path="/edit-profile" component={() => <EditProfile/> } />
            <Route exact path="/view-profile" component={() => <ViewProfile/> }/>

          </Switch>
          
        
        </div>
      </div>
    </div>
    </Router>
  );
}