import React, { Component } from "react";
import UserHelper from "../Helpers/UserHelper.js";
import LimitDashboardComponent from './LimitDashboardComponent';
import AuthenticationService from "./../APIs/AuthenticationService.js";
import PrescriptionLineService from "./../APIs/PrescriptionLineService.js";

class WelcomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actions: [],
      username: "",
      name: "",
      showSelect: false,
      error: false,
      basicDashboard: false
    };

    this.setUserAction = this.setUserAction.bind(this);
  }

  componentDidMount() {
    let error = false;
    let role = AuthenticationService.getLoggedInUserRole();
    let basicDashboard = false;

    PrescriptionLineService.unregisterPrescriptionLine();

    if (this.props.match.params.status) {
      error = true;
    }

    if (role === 'secretaria') {
      basicDashboard = true;
    }

    this.setState({
      username: AuthenticationService.getLoggedInUser(),
      error,
      actions: UserHelper.getActionsByRole(role),
      showSelect: role === 'tecnico',
      basicDashboard
    });
  }

  setUserAction(e) {
    const action = e.target.id
    PrescriptionLineService.registerUserAction(action);

    if (action === 'normal') {
      this.props.history.push("/linea");
    } else {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="domain">
        <h2>Bienvenido(a), {AuthenticationService.getLoggedInUserName()}!</h2>
        {!this.state.basicDashboard && <div className="container">
          {this.state.error && (
            <div className="alert alert-warning" role="alert">
              Debe seleccionar una acci&oacute;n
            </div>
          )}
          {this.state.showSelect && <p>Seleccione la acci&oacute;n a realizar</p>}
          {!this.state.showSelect && <p>Selecione la l&iacute;nea de revisi&oacute;n</p>}
          {this.state.actions.map(line => {
            return (
              <button
                type="button"
                className="btn btn-success col-xs-8 col-sm-8 col-md-5 col-lg-5 m-1"
                style={{ padding: "15px" }}
                onClick={this.setUserAction}
                id={line.pseudo}
                key={line.pseudo}
              >
                {line.name}
              </button>
            );
          })}
        </div>}
        {this.state.basicDashboard && <div className="container">
          <LimitDashboardComponent />
        </div>}
      </div>
    );
  }
}

export default WelcomeComponent;
