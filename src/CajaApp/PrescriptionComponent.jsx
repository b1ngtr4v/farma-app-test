import React, { Component } from "react";
import PrescriptionService from "./../APIs/PrescriptionService.js";
import PrescriptionHelper from "./../Helpers/PrescriptionHelper.js";

class PrescriptionComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      drugs: [],
      prescription: {
        category: null,
        queue: null,
        date: null,
        status: ""
      }
    };

    this.savePrescription = this.savePrescription.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  componentDidMount() {
    const id = atob(this.props.match.params.id);
    let prescription = PrescriptionService.getPrescriptionListById(
      parseInt(id)
    );
    let drugs = [];

    if (prescription) {
      drugs = prescription.medicates;
      delete prescription.medicates;
    }

    this.setState({ id, drugs, prescription });
  }

  handleTextChange(e) {
    const type = e.target.id.split("-");
    let actVarName;
    let actVar;

    switch (type[0]) {
      case "prescription":
        actVarName = "prescription";
        actVar = { ...this.state.prescription };
        actVar[type[1]] = e.target.value;
        break;
      case "medicate":
        actVarName = "medicate";
        actVar = [...this.state.drug];
        actVar[type[1]] = e.target.value;
        break;
      default:
        actVarName = type[0];
        actVar = e.target.value;
    }

    this.setState({
      [actVarName]: actVar
    });
  }

  savePrescription(e) {
    e.preventDefault();

    console.log("Prescription saved!");

    setTimeout(() => {
      this.props.history.push("/recetas");
    }, 200);
  }

  render() {
    return (
      <div className="domain">
        <h2>Receta {this.state.id}</h2>
        <div className="container col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <div className="row mt-4 text-left">
            <div className="col-sm-6 col-md-6">
              <p>
                <b>Categor&iacute;a</b>:{" "}
                {PrescriptionHelper.getCategoryName(
                  this.state.prescription.category
                )}
              </p>
            </div>
            <div className="col-sm-6 col-md-6">
              <p>
                <b>L&iacute;nea</b>:{" "}
                {PrescriptionHelper.getQueueName(this.state.prescription.queue)}
              </p>
            </div>
            <div className="col-sm-6 col-md-6">
              <p>
                <b>Tipo</b>:{" "}
                {PrescriptionHelper.getClassTypeName(
                  this.state.prescription.classType
                )}
              </p>
            </div>
            <div className="col-sm-6 col-md-6">
              <p>
                <b>Fecha</b>:{" "}
                {PrescriptionHelper.getDate(
                  this.state.prescription.createdDate
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="container col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <form onSubmit={this.savePrescription}>
            <div className="m-2">
              {this.state.drugs &&
                this.state.drugs.map((drug, index) => {
                  return (
                    <div
                      className="form-group row border rounded px-4 py-2"
                      key={"medicate-" + index}
                    >
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={"medicate-" + index}
                          value={this.state.drugs[index].checked}
                        />
                        <label
                          className="form-check-label text-left ml-2"
                          htmlFor={"medicate-" + index}
                        >
                          <b>Medicamento</b>: {drug.name}
                          <br />
                          <b>Cantidad</b>: {drug.quantity}
                          <br />
                          <b>Unidad</b>: {drug.methric}
                        </label>
                      </div>
                    </div>
                  );
                })}
              {!this.state.drugs && (
                <div>No se obtuvo informaci&oacute;n sobre esta receta</div>
              )}
            </div>
            {this.state.drugs && (
              <div className="row mb-2 text-left">
                <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8"></div>
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                  <label htmlFor="status">Estado</label>
                  <select
                    className="form-control"
                    id="prescription-status"
                    value={this.state.prescription.status}
                    onChange={this.handleTextChange}
                  >
                    <option value="Backlog">En Cola</option>
                    <option value="In Progress">En Proceso</option>
                    <option value="Completed">Completado</option>
                  </select>
                </div>
              </div>
            )}
            <button type="submit" className="btn btn-primary float-right">
              Cerrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default PrescriptionComponent;
