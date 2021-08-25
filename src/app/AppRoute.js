import React from 'react';
import '../assets/scss/custom.scss';
import '../../node_modules/react-responsive-carousel/lib/styles/carousel.css'
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { withRouter } from "react-router";

//Aquí importamos módulo que permite guardar las variables de sesión en la aplicación
import AppProvider from "../components/AppContext";

/*Views*/
import {CreateYourProfile} from './views/CreateYourProfile/index';
import {Login} from './views/Login/index';
import {EditProfile} from './views/EditProfile/index';
import {ForgotPassword} from './views/ForgotPassword/index';
import { UserName } from './views/UserName/index';

/*Componente para el manejo de rutas de la app*/
const AppRoute = () => {

  return (
    <>
        <AppProvider>
          <Switch>
            <Route exact path="/login" component={() => <Login /> } />
            <Route exact path="/create-profile" component={() => <CreateYourProfile/> } />
            <Route exact path="/edit-profile" component={() => <EditProfile/> } />
            <Route exact path="/forgot-password" component={() => <ForgotPassword/> }/>
            
            {/*Con esto obtenemos el user del stdcompany/username y redireccionamos al login porque es una "/"" sola*/}
            <Route exact path="/:params" component={(params) => <UserName {...params} /> }/>
            <Route exact path="/" render={() => (
                <Redirect to="/login"/>
            )}/>

          </Switch>
          </AppProvider>
    </>
  );
}
export default withRouter(AppRoute);