import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link, NavLink } from "react-router-dom";
import "./../css/Header.css";
import AuthenticationService from "./../APIs/AuthenticationService.js";

class HeaderComponent extends Component {
  render() {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    const isUserAdmin =
      isUserLoggedIn && AuthenticationService.getLoggedInUserRole() === "admin";
    const isUserSecretaria =
      isUserLoggedIn &&
      AuthenticationService.getLoggedInUserRole() === "secretaria";

    return (
      <nav className="navbar navbar-expand-lg navbar-light caja-color">
        <Link to="/" className="navbar-brand">
          Farma App
        </Link>
        {isUserLoggedIn && (
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
        )}
        {isUserLoggedIn && (
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/dashboard" className="nav-link">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/bienvenido" className="nav-link">
                  Linea
                </NavLink>
              </li>
              {!isUserSecretaria && (
                <li className="nav-item">
                  <NavLink to="/recetas" className="nav-link">
                    Recetas
                  </NavLink>
                </li>
              )}
              {isUserAdmin && (
                <li className="nav-item">
                  <NavLink to="/usuarios" className="nav-link">
                    Usuarios
                  </NavLink>
                </li>
              )}
            </ul>
            <ul className="navbar-nav navbar-collapse justify-content-end mr-auto">
              <li className="nav-item dropdown">
                <button
                  type="button"
                  className="btn caja-color dropdown-toggle mr-md-2"
                  id="settings"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <b
                    className="d-inline-block text-truncate"
                    style={{ maxWidth: "200px" }}
                  >
                    {AuthenticationService.getLoggedInUserName()}
                  </b>
                </button>
                <div
                  className="dropdown-menu dropdown-menu-right caja-color"
                  aria-labelledby="settings"
                >
                  <NavLink
                    to="/perfil/usuario/"
                    exact
                    className="dropdown-item"
                  >
                    Perfil
                  </NavLink>
                  <NavLink to="/perfil/usuario/pw" className="dropdown-item">
                    Contrase&ntilde;a
                  </NavLink>
                  <div className="dropdown-divider" />
                  <NavLink to="/salir" className="dropdown-item">
                    Salir
                  </NavLink>
                </div>
              </li>
            </ul>
          </div>
        )}
      </nav>
    );
  }
}

export default withRouter(HeaderComponent);
