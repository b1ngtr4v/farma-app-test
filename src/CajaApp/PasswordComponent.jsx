import React, { Component } from "react";
import UserService from "./../APIs/UserService.js";
import AuthenticationService from "./../APIs/AuthenticationService.js";

class PasswordComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      block: false,
      updated: null,
      error: null
    };

    this.handlePasswordText = this.handlePasswordText.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateNewPassword = this.validateNewPassword.bind(this);
    this.validateConfirmPassword = this.validateConfirmPassword.bind(this);
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.unsetValidation = this.unsetValidation.bind(this);
  }

  componentDidMount() {
    this.setState({ username: AuthenticationService.getLoggedInUser() });
  }

  handlePasswordText(e) {
    const pass = e.target;

    this.setState({
      [pass.id]: pass.value
    });
  }

  validatePassword(e) {
    this.unsetValidation(e);
    const password = e.target.value;

    if (password.length) {
      const username = this.state.username;
      const validUser = UserService.validatedUser(username, btoa(password));
      const status = validUser;
      const style = status ? "is-valid" : "is-invalid";
      status
        ? e.target.setCustomValidity("")
        : e.target.setCustomValidity("invalid");

      e.target.classList.add(style);
    }
  }

  validateNewPassword(e) {
    this.unsetValidation(e);
    const password = e.target.value;

    if (password.length) {
      const status = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
        password
      );
      const style = status ? "is-valid" : "is-invalid";
      status
        ? e.target.setCustomValidity("")
        : e.target.setCustomValidity("invalid");

      e.target.classList.add(style);
    }

    document.getElementById("confirmPassword").focus();
    document.getElementById("confirmPassword").blur();
  }

  validateConfirmPassword(e) {
    this.unsetValidation(e);
    const password = e.target.value;

    if (password.length) {
      const status = password === this.state.newPassword;
      const style = status ? "is-valid" : "is-invalid";
      status
        ? e.target.setCustomValidity("")
        : e.target.setCustomValidity("invalid");

      e.target.classList.add(style);
    }
  }

  unsetValidation(e) {
    e.target.classList.remove("is-valid");
    e.target.classList.remove("is-invalid");
  }

  handleBack() {
    console.log(this.props);
    this.props.handleBack();
  }

  handlePasswordSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ updated: null, error: null });

    if (e.target.checkValidity()) {
      const passStatus = UserService.updatePassword(
        this.state.username,
        btoa(this.state.newPassword)
      );

      if (passStatus) {
        this.setState({ updated: true });
      } else {
        this.setState({ error: true });
      }
    }

    e.target.classList.add("was-validated");
  }

  render() {
    return (
      <div>
        {this.state.updated && (
          <div className="alert alert-success text-center">
            Contrase&ntilde;a actualizada correctamente
          </div>
        )}
        {this.state.error && (
          <div className="alert alert-warning text-center">
            No se logr&oacute; actualizar, intente m&aacute;s tarde
          </div>
        )}
        <form
          className="needs-validation"
          noValidate
          onSubmit={this.handlePasswordSubmit}
        >
          <div className="form-group">
            <div className="form-row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <label htmlFor="currentPassword">
                  Contrase&ntilde;a actual
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="currentPassword"
                  maxLength="50"
                  onChange={this.handlePasswordText}
                  onClick={this.unsetValidation}
                  onBlur={this.validatePassword}
                  value={this.state.currentPassword}
                  required
                />
                <div className="valid-feedback">Es probable!</div>
                <div className="invalid-feedback">Intente nuevamente.</div>
              </div>
            </div>
            <hr className="separator" />
            <div className="form-row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <label htmlFor="currentPassword">Nueva contrase&ntilde;a</label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  maxLength="50"
                  onChange={this.handlePasswordText}
                  onClick={this.unsetValidation}
                  onBlur={this.validateNewPassword}
                  value={this.state.newPassword}
                  required
                />
                <div className="valid-feedback">Funciona!</div>
                <div className="invalid-feedback">Faltan criterios.</div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <label htmlFor="currentPassword">
                  Confirme nueva contrase&ntilde;a
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  maxLength="50"
                  onChange={this.handlePasswordText}
                  onClick={this.unsetValidation}
                  onBlur={this.validateConfirmPassword}
                  value={this.props.confirmPassword}
                  required
                />
                <div className="valid-feedback">Corresponde!</div>
                <div className="invalid-feedback">No corresponde.</div>
              </div>
              <small id="passwordHelpBlock" className="form-text text-muted">
                Debe contener: m&iacute;nimo 8 caracteres. Al menos un
                n&uacute;mero, una may&uacute;scula y una m&iacute;nuscula
              </small>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary float-left"
            onClick={this.handleBack}
            disabled={this.state.block}
          >
            Atr&aacute;s
          </button>
          <button
            type="submit"
            className="btn btn-warning float-right"
            disabled={this.state.block}
          >
            Actualizar Contrase&ntilde;a
          </button>
        </form>
      </div>
    );
  }
}

export default PasswordComponent;
