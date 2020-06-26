import React, { Component } from "react";
import AuthenticationService from "./../APIs/AuthenticationService.js";
import PrescriptionLineService from "./../APIs/PrescriptionLineService.js";
import PrescriptionHelper from "../Helpers/PrescriptionHelper.js";
import LimitDashboardComponent from './LimitDashboardComponent'

class WelcomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lines: [],
      username: "",
      name: "",
      showSelect: false,
      error: false,
      basicDashboard: false
    };

    this.setLine = this.setLine.bind(this);
  }

  componentDidMount() {
    let error = false;
    let role = AuthenticationService.getLoggedInUserRole();
    let basicDashboard = false;

    if (this.props.match.params.status) {
      error = true;
    }

    if (role === 'secretaria') {
      basicDashboard = true;
    }

    this.setState({
      username: AuthenticationService.getLoggedInUser(),
      error,
      lines: PrescriptionHelper.getLines(role),
      showSelect: role === 'tecnico',
      basicDashboard
    });
  }

  setLine(e) {
    PrescriptionLineService.registerPrescriptionLine(e.target.id);
    this.props.history.push("/dashboard");
  }

  render() {
    return (
      <div className="domain">
        <h2>Bienvenido(a), {AuthenticationService.getLoggedInUserName()}!</h2>
        {!this.state.basicDashboard && <div className="container">
          {this.state.error && (
            <div className="alert alert-warning" role="alert">
              Seleccione una l&iacute;nea de trabajo
            </div>
          )}
          {this.state.showSelect && <p>Seleccione la l&iacute;nea de acopio</p>}
          {!this.state.showSelect && <p>Selecione la l&iacute;nea de revisi&oacute;n</p>}
          {this.state.lines.map(line => {
            return (
              <button
                type="button"
                className="btn btn-success col-xs-8 col-sm-8 col-md-5 col-lg-5 m-1"
                style={{ padding: "15px" }}
                onClick={this.setLine}
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
