import React from 'react'
import AppRoute from './AppRoute';
import {Router} from "react-router-dom";
import history from '../components/History';

/*Componente nucleo de nuestra app*/
export const MainApp = () => {
    return (
        <Router history={history}>
        <AppRoute/>
        </Router>
    )
}
