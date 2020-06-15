import React, { Component } from "react";
import UserService from "./../APIs/UserService.js";
import UserHelper from "../Helpers/UserHelper.js";

class UserDetailsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roles: [],
      username: "",
      name: "",
      lastname: "",
      ident: "",
      phone: "",
      mail: "",
      job: "",
      role: "",
      currentPassword: "",
      newUser: false,
      successMessage: null,
      errorMessage: null
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.validatePhone = this.validatePhone.bind(this);
    this.validateMail = this.validateMail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.waitToBack = this.waitToBack.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.username) {
      const username = atob(this.props.match.params.username);
      const userInfo = UserService.getUser(username);

      this.setState(userInfo);
    } else {
      this.setState({ newUser: true });
    }

    this.setState({ roles: UserHelper.getRoles() });
  }

  handleTextChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  validatePhone(e) {
    const phone = e.target.value;

    if (phone.length) {
      // eslint-disable-next-line
      /^(\d){4}-(\d){4}$/.test(phone)
        ? e.target.setCustomValidity("")
        : e.target.setCustomValidity("invalid");
    }
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

  handleBack() {
    this.props.history.push("/usuarios");
  }

  waitToBack() {
    setTimeout(() => {
      this.handleBack();
    }, 2500);
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      errorMessage: null,
      successMessage: null,
      block: true
    });

    if (e.target.checkValidity()) {
      let actUser = { ...this.state };
      delete actUser.roles;
      delete actUser.confirmPassword;
      delete actUser.newUser;
      delete actUser.errorMessage;
      delete actUser.successMessage;

      if (this.state.newUser) {
        if (UserService.createUser(actUser) > -1) {
          this.setState({
            successMessage: "Usuario nuevo creado correctamente"
          });
          this.waitToBack();
        } else {
          this.setState({
            errorMessage: "Error creando el nuevo usuario",
            block: false
          });
        }
      } else {
        if (UserService.updateUser(actUser)) {
          this.setState({
            successMessage: "Usuario actualizado correctamente"
          });
          this.waitToBack();
        } else {
          this.setState({
            errorMessage: "Error actualizando el usuario, intente más tarde",
            block: false
          });
        }
      }
    }

    e.target.classList.add("was-validated");
  }

  render() {
    return (
      <div className="domain">
        <h3>Perfil de usuario</h3>
        <div className="container col-xs-12 col-sm-12 col-md-6 col-lg-6 text-left mt-4">
          <div className="row float-center">
            {this.state.errorMessage && (
              <div className="alert alert-danger w-100">
                {this.state.errorMessage}
              </div>
            )}
            {this.state.successMessage && (
              <div className="alert alert-success w-100">
                {this.state.successMessage}
              </div>
            )}
          </div>
          <form
            className="needs-validation"
            noValidate
            onSubmit={this.handleSubmit}
          >
            <div className="form-group">
              <div className="form-row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <label htmlFor="username">Usuario</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="sp-username">
                        @
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      maxLength="20"
                      onChange={this.handleTextChange}
                      value={this.state.username}
                      readOnly={this.state.newUser ? false : true}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="form-row my-2">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <label htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    maxLength="60"
                    onChange={this.handleTextChange}
                    value={this.state.name}
                    required
                  />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <label htmlFor="lastname">Apellidos</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    maxLength="60"
                    onChange={this.handleTextChange}
                    value={this.state.lastname}
                    required
                  />
                </div>
              </div>
              <div className="form-row my-2">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <label htmlFor="ident">C&eacute;dula</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ident"
                    maxLength="20"
                    onChange={this.handleTextChange}
                    value={this.state.ident}
                    required
                  />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <label htmlFor="phone">Tel&eacute;fono</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    minLength="9"
                    maxLength="9"
                    onChange={this.handleTextChange}
                    onBlur={this.validatePhone}
                    value={this.state.phone}
                    required
                  />
                  <div className="invalid-feedback">
                    Ingrese un tel&eacute;fono valido (9999-9999).
                  </div>
                </div>
              </div>
            </div>
            <hr className="separator" />
            <div className="form-group">
              <div className="form-row my-2">
                <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                  <label htmlFor="mail">Correo electr&oacute;nico</label>
                  <input
                    type="email"
                    className="form-control"
                    id="mail"
                    maxLength="40"
                    onChange={this.handleTextChange}
                    onBlur={this.validateMail}
                    value={this.state.mail}
                    required
                  />
                  <div className="invalid-feedback">
                    Ingrese un correo v&aacute;lido (usuario@servidor.com).
                  </div>
                </div>
              </div>
              <div className="form-row my-2">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <label htmlFor="job">Puesto de trabajo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="job"
                    maxLength="40"
                    onChange={this.handleTextChange}
                    value={this.state.job}
                    required
                  />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                  <label htmlFor="role">Tipo de acceso</label>
                  <select
                    className="form-control"
                    id="role"
                    value={this.state.role}
                    onChange={this.handleTextChange}
                    required
                  >
                    <option defaultValue />
                    {this.state.roles.map((role, index) => {
                      return (
                        <option value={role.id} key={index}>
                          {role.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
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
            {!this.state.newUser && (
              <button type="submit" className="btn btn-success float-right">
                Guardar Perfil
              </button>
            )}
            {this.state.newUser && (
              <button type="submit" className="btn btn-success float-right">
                Crear Perfil
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default UserDetailsComponent;
