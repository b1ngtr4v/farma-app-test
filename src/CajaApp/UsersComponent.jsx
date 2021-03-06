import $ from 'jquery'
import React, { Component } from "react";
import AuthenticationService from "./../APIs/AuthenticationService.js";
import UserService from "./../APIs/UserService.js";
import UserHelper from "../Helpers/UserHelper.js";

class UsersComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      terget: '',
      disable: false
    };

    this.showUser = this.showUser.bind(this);
    this.newUser = this.newUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this)
    this.confirmedDeleteUser = this.confirmedDeleteUser.bind(this)
  }

  componentDidMount() {
    const username = AuthenticationService.getLoggedInUser();

    if (UserService.isUserAdmin(username)) {
      const users = UserService.getUsers()
      // eslint-disable-next-line
        .map(user => {
          if (user.username !== username) {
            return user;
          }
        })
        .filter(x => x);

      this.setState({ users });
    } else {
      this.props.history.push("/dashboard");
    }
  }

  getAllUsers() {
    const username = AuthenticationService.getLoggedInUser();

    const users = UserService.getUsers()
    // eslint-disable-next-line
      .map(user => {
        if (user.username !== username) {
          return user;
        }
      })
      .filter(x => x);

    this.setState({ users });
  }

  showUser(username) {
    this.props.history.push(`/usuarios/${btoa(username)}`);
  }

  deleteUser(username) {
    if (username === AuthenticationService.getLoggedInUser()) {
      return false
    }

    this.setState({ target: username })
    $('#customModal').modal('show');
  }

  confirmedDeleteUser() {
    if (UserService.deleteUser(this.state.target)) {
      this.getAllUsers()
    }

    $('#customModal').modal('hide');
  }

  newUser() {
    this.props.history.push("/usuarios/nuevo");
  }

  render() {
    return (
      <div className="domain">
        <h2>Administrar usuarios</h2>
        <div className="modal fade" id="customModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title" id="exampleModalLabel">Eliminar usuario</h5>
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									¿Est&aacute; seguro de eliminar a {this.state.target}?
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
									<button type="button" className="btn btn-danger" onClick={this.confirmedDeleteUser}>Eliminar</button>
								</div>
							</div>
						</div>
					</div>
        <div className="container">
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
          <div className="row float-right pb-1 mr-1">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.newUser}
            >
              Nuevo
            </button>
          </div>
          <div className="table-responsive w-100">
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre de usuario</th>
                  <th>Nombre</th>
                  <th>Posici&oacute;n</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((user, index) => {
                  return (
                    <tr key={"user-" + index}>
                      <td>{user.username}</td>
                      <td>
                        {user.name} {user.lastname}
                      </td>
                      <td>{user.job}</td>
                      <td>{UserHelper.getRoleName(user.role)}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-success mr-1 mb-1"
                          onClick={() => this.showUser(user.username)}
                        >
                          Ver
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger mr-1 mb-1"
                          onClick={() => this.deleteUser(user.username)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default UsersComponent;
