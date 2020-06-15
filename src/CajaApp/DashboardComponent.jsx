import React, { Component } from "react";
import PrescriptionLineService from "./../APIs/PrescriptionLineService.js";
import PrescriptionService from "./../APIs/PrescriptionService.js";
import PrescriptionHelper from "./../Helpers/PrescriptionHelper.js";
import "./../css/Main.css";

class DashboardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      line: "",
      prescriptions: [],
      records: {
        totalToday: "25",
        attendedToday: "10",
        normalTime: "1h 30m",
        fastTime: "30m"
      }
    };

    this.refreshList = this.refreshList.bind(this);
    this.showTask = this.showTask.bind(this);
  }

  componentDidMount() {
    let line = "";

    if (
      PrescriptionLineService.isPrescriptionLineDefined() &&
      PrescriptionLineService.getPrescriptionLine() !== "none"
    ) {
      line = PrescriptionLineService.getPrescriptionLine();
      this.setState({ line });
    } else {
      this.props.history.push("/bienvenido/" + btoa("error"));
    }

    this.setState({
      prescriptions: PrescriptionService.getPrescriptionListByLine(line)
    });
    this.refreshList();
  }

  refreshList() {
    const records = {
      totalToday: PrescriptionService.getRecordsLogByStatus("total"),
      attendedToday: PrescriptionService.getRecordsLogByStatus("completed"),
      normalTime: PrescriptionService.getTimeByLine("normal"),
      fastTime: PrescriptionService.getTimeByLine("fast")
    };

    this.setState({ records });
  }

  showTask(id) {
    this.props.history.push(`/receta/detalles/${btoa(id)}`);
  }

  render() {
    return (
      <div className="domain">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-4 order-sm-1 order-md-12">
            <div className="container">
              <h4>Registros</h4>
              <div className="row mt-4">
                <div className="col-sm col-md">
                  <button
                    type="button"
                    className="btn btn-secundary btn-caja"
                    readOnly
                  >
                    {this.state.records.totalToday}
                  </button>
                  <p>Recetas recibidas hoy</p>
                </div>
                <div className="col-sm col-md">
                  <button
                    type="button"
                    className="btn btn-secundary btn-caja"
                    readOnly
                  >
                    {this.state.records.attendedToday}
                  </button>
                  <p>Recetas atendidas hoy</p>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-sm">
                  <button
                    type="button"
                    className="btn btn-secundary btn-caja"
                    readOnly
                  >
                    {this.state.records.fastTime}
                  </button>
                  <p>
                    Tiempo estimado de preparación l&iacute;nea r&aacute;pida
                  </p>
                </div>
                <div className="col-sm">
                  <button
                    type="button"
                    className="btn btn-secundary btn-caja"
                    readOnly
                  >
                    {this.state.records.normalTime}
                  </button>
                  <p>
                    Tiempo estimado de preparación l&iacute;nea alto volumen
                  </p>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={
                    () => alert("Importando recetas...") /*this.getFromCaja()*/
                  }
                >
                  Importar recetas
                </button>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-9 col-lg-8 order-sm-12 order-md-1">
            <h3>Recetas</h3>
            <div className="container">
              <div className="table-responsive w-100">
                <table className="table">
                  <thead>
                    <tr>
                      <th># consecutivo</th>
                      <th>Categor&iacute;a</th>
                      <th>L&iacute;nea</th>
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
                        <td>
                          {PrescriptionHelper.getQueueName(prescription.queue)}
                        </td>
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
        </div>
      </div>
    );
  }
}

export default DashboardComponent;
