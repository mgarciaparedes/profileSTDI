import React from 'react';
import '../assets/css/App.css';
import '../assets/scss/custom.scss';
import '../components/body.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { withRouter } from "react-router";

/*Views*/
import {CreateYourProfile} from './views/CreateYourProfile/index';
import {Login} from './views/Login/index';
import {EditProfile} from './views/EditProfile/index';
import {ViewProfile} from './views/ViewProfile/index';

/*Componente para el manejo de rutas de la app*/
const AppRoute = () => {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-lg-12">
          <Switch>
            <Route exact path="/login" component={() => <Login/> } />
            <Route exact path="/create-profile" component={() => <CreateYourProfile/> } />
            <Route exact path="/edit-profile" component={() => <EditProfile/> } />
            <Route exact path="/view-profile" component={() => <ViewProfile/> }/>
            <Route exact path="/" render={() => (
                <Redirect to="/login"/>
            )}/>
          </Switch>
        </div>
      </div>
    </div>
  );
}
export default withRouter(AppRoute);