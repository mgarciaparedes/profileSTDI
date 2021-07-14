import React from 'react';
import '../assets/scss/custom.scss';
import {
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
import {ForgotPassword} from './views/ForgotPassword/index';
import { UserName } from './views/UserName/index';

import { useForm } from "react-hooks-helper";


/*Componente para el manejo de rutas de la app*/
const AppRoute = () => {

  const [session, setSession] = useForm({
    token: null,
    userid: null
  });

  const sessionProps = {session, setSession}

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-lg-12">
          <Switch>
            <Route exact path="/login" component={() => <Login {...sessionProps} /> } />
            <Route exact path="/create-profile" component={() => <CreateYourProfile/> } />
            <Route exact path="/edit-profile" component={() => <EditProfile/> } />
            <Route exact path="/view-profile" component={() => <ViewProfile/> }/>
            <Route exact path="/forgot-password" component={() => <ForgotPassword/> }/>
            
            {/*Con esto obtenemos el user del stdcompany/username y redireccionamos al login porque es una "/"" sola*/}
            <Route exact path="/:params" component={(params) => <UserName {...params} /> }/>
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