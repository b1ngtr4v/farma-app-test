import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Error from './ErrorComponent'
import Login from './LoginComponent'
import Logout from './LogoutComponent'
import Welcome from './WelcomeComponent'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import AuthenticatedRoute from './AuthenticatedRouteComponent'
import Prescriptions from './PrescriptionsComponent'
import Prescription from './PrescriptionComponent'
import PrescriptionDetails from './PrescriptionDetailsComponent'
import Dashboard from './DashboardComponent'
import User from './UserComponent'
import UserNewDetails from './UserDetailsComponent'
import UserDetails from './UserDetailsComponent'
import Users from './UsersComponent'
import Password from './UserPasswordComponent'
import PasswordRecovery from './PasswordRecoveryComponent'

import '../css/Caja.css'

class CajaComponent extends Component {
    render() {
        return (
            <div className="FarmaApp">
                <Router>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={Login} />
                        <Route path="/login" component={Login} />
                        <Route path="/recuperar" component={PasswordRecovery} />
                        <AuthenticatedRoute path="/bienvenido/:status?" component={Welcome} />
                        <AuthenticatedRoute path="/dashboard" component={Dashboard} />
                        <AuthenticatedRoute path="/receta/detalles/:id" component={PrescriptionDetails} />
                        <AuthenticatedRoute path="/recetas" component={Prescriptions} />
                        <AuthenticatedRoute path="/receta/:id" component={Prescription} />
                        <AuthenticatedRoute path="/perfil/usuario/pw" component={Password} />
                        <AuthenticatedRoute path="/perfil/usuario" component={User} />
                        <AuthenticatedRoute path="/usuarios/nuevo" component={UserNewDetails} />
                        <AuthenticatedRoute path="/usuarios/:username" component={UserDetails} />
                        <AuthenticatedRoute path="/usuarios" component={Users} />
                        <AuthenticatedRoute path="/salir" component={Logout} />
                        <Route component={Error} />
                    </Switch>
                    <Footer />
                </Router>
            </div>
        )
    }
}

export default CajaComponent
