import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserService from "./../APIs/UserService.js";
import AuthenticationService from "./../APIs/AuthenticationService.js";

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      hasLoginFailed: false,
      showSuccess: false
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    if (AuthenticationService.isUserLoggedIn()) {
      this.props.history.push("/bienvenido");
    }
  }

  handleTextChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  login(e) {
    e.preventDefault();
    e.stopPropagation();

    const user = UserService.validatedUser(
      this.state.username,
      btoa(this.state.password)
    );

    if (user !== null) {
      AuthenticationService.registerSuccessfullLogin(
        user.username,
        user.name,
        user.role
      );
      this.props.history.push("/bienvenido");
    } else {
      this.setState({
        hasLoginFailed: true
      });
    }
  }

  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 m-auto">
        <div className="container-fluid domain">
          <h2>Inicie sesi&oacute;n</h2>
          {this.state.hasLoginFailed && (
            <div className="alert alert-warning text-center">
              Usuario o contrase&ntilde;a incorrecta
            </div>
          )}
          {this.state.hasLoginError && (
            <div className="alert alert-danger text-center">
              Error con el servicio de validaci&oacute;n, intente m&aacute;s
              tarde
            </div>
          )}
          <form onSubmit={this.login}>
            <div className="text-left">
              <div className="form-group">
                <label htmlFor="username">Usuario</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={this.state.username}
                  onChange={this.handleTextChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contrase&ntilde;a</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={this.state.password}
                  onChange={this.handleTextChange}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2">
              Ingresar
            </button>
            <hr className="separator" />
            <div>
              <Link to="/recuperar" className="link">
                Recuperar la contrase&ntilde;a
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
