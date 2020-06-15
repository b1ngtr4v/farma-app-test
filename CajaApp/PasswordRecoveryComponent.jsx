import React, { Component } from "react";
import UserService from "../APIs/UserService.js";
import AuthenticationService from "../APIs/AuthenticationService.js";

class PasswordRecoveryComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      fieldValidater: "",
      newPassword: "",
      confirmPassword: "",
      success: false,
      error: false,
      valid: false
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
    this.validateMail = this.validateMail.bind(this);
    this.validateNewPassword = this.validateNewPassword.bind(this);
    this.validateConfirmPassword = this.validateConfirmPassword.bind(this);
    this.validateUser = this.validateUser.bind(this);
  }

  componentDidMount() {
    if (AuthenticationService.isUserLoggedIn()) {
      this.props.history.push("/");
    }
  }

  handleTextChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  validateMail(e) {
    const mail = e.target.value;

    if (mail.length) {
      // eslint-disable-next-line
      /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.test(mail)
        ? e.target.setCustomValidity("")
        : e.target.setCustomValidity("invalid");
    }
  }

  unsetValidation(e) {
    e.target.classList.remove("is-valid");
    e.target.classList.remove("is-invalid");
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

  handleBack() {
    this.props.history.push("/");
  }

  validateUser() {
    if (this.state.username.length && this.state.fieldValidater.length) {
      if (
        UserService.resetUser(
          this.state.username,
          btoa(this.state.fieldValidater)
        )
      ) {
        this.setState({ valid: true });
      }
    }
  }

  handlePasswordSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ success: false, error: false });

    if (e.target.checkValidity()) {
      e.target.reset();
      if (
        UserService.updatePassword(
          this.state.username,
          btoa(this.state.newPassword)
        )
      ) {
        this.setState({ success: true });

        setTimeout(this.handleBack(), 3000);
      }
    }
  }

  render() {
    return (
      <div className="domain">
        <h2>Recuperar acceso</h2>
        <div className="container col-xs-12 col-sm-12 col-md-6 col-lg-6 text-left mt-4">
          {!this.state.valid && !this.state.error && (
            <div className="alert alert-warning text-center">
              Valide su cuenta
            </div>
          )}
          {this.state.success && (
            <div className="alert alert-success text-center">
              Ingrese con su nueva contrase&ntilde;a
            </div>
          )}
          {this.state.error && (
            <div className="alert alert-danger text-center">
              Error recuperando cuenta, intente luego
            </div>
          )}
          <div className="container">
            <form>
              <div className="form-group">
                <div className="form-row my-2">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <label htmlFor="username">Usuario</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      onChange={this.handleTextChange}
                      onBlur={this.validateUser}
                      value={this.state.username}
                    />
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <label htmlFor="fieldValidater">
                      Correo electr&oacute;nico o tel&eacute;fono
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="fieldValidater"
                      onChange={this.handleTextChange}
                      onBlur={this.validateUser}
                      value={this.state.fieldValidater}
                    />
                  </div>
                </div>
              </div>
            </form>
            <hr className="separator" />
            <form
              className="needs-validation"
              noValidate
              onSubmit={this.handlePasswordSubmit}
            >
              {this.state.valid && (
                <div className="form-group">
                  <div className="form-row">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                      <label htmlFor="currentPassword">
                        Nueva contrase&ntilde;a
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        maxLength="50"
                        onChange={this.handleTextChange}
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
                        onChange={this.handleTextChange}
                        onClick={this.unsetValidation}
                        onBlur={this.validateConfirmPassword}
                        value={this.state.confirmPassword}
                        required
                      />
                      <div className="valid-feedback">Corresponde!</div>
                      <div className="invalid-feedback">No corresponde.</div>
                    </div>
                    <small
                      id="passwordHelpBlock"
                      className="form-text text-muted"
                    >
                      Debe contener: m&iacute;nimo 8 caracteres. Al menos un
                      n&uacute;mero, una may&uacute;scula y una m&iacute;nuscula
                    </small>
                  </div>
                </div>
              )}
              <button
                type="button"
                className="btn btn-primary float-left"
                onClick={this.handleBack}
                disabled={this.state.block}
              >
                Atr&aacute;s
              </button>
              {this.state.valid && (
                <button
                  type="submit"
                  className="btn btn-warning float-right"
                  disabled={this.state.block}
                >
                  Crear Contrase&ntilde;a
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PasswordRecoveryComponent;
