import React, { Component } from "react";
import PrescriptionService from "./../APIs/PrescriptionService.js";
import PrescriptionHelper from "./../Helpers/PrescriptionHelper.js";
import AuthenticationService from "./../APIs/AuthenticationService.js";

class PrescriptionsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prescriptions: []
    };

    this.showTask = this.showTask.bind(this);
  }

  componentDidMount() {
    const role = AuthenticationService.getLoggedInUserRole()
    
    if (['secretaria', 'ventana'].indexOf(role) >= 0) {
      this.props.history.push("/bienvenido");
    }

    this.setState({
      prescriptions: PrescriptionService.getPrescriptionListByUser(
        AuthenticationService.getLoggedInUser()
      )
    });
  }

  showTask(id) {
    this.props.history.push(`/receta/${btoa(id)}`);
  }

  render() {
    const showStatus = ['farma', 'admin'].indexOf(AuthenticationService.getLoggedInUserRole()) >= 0
    return (
      <div className="domain">
        <h2>Mis recetas</h2>
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
          <div className="table-responsive w-100">
            <table className="table">
              <thead>
                <tr>
                  <th># consecutivo</th>
                  <th>Categor&iacute;a</th>
                  {!showStatus && <th>L&iacute;nea</th>}
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.prescriptions.map(prescription => (
                  <tr key={"prescription-" + prescription.id}>
                    <td>{prescription.id}</td>
                    <td>
                      {PrescriptionHelper.getCategoryName(
                        prescription.category
                      )}
                    </td>
                    {!showStatus && <td>
                      {PrescriptionHelper.getQueueName(prescription.queue)}
                    </td>}
                    <td>
                      <button
                        type="button"
                        className="btn btn-success mr-1"
                        onClick={() => this.showTask(prescription.id)}
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default PrescriptionsComponent;
