import React, { Component } from "react";
import PrescriptionLineService from "./../APIs/PrescriptionLineService.js";
import AuthenticationService from "./../APIs/AuthenticationService.js";
import PrescriptionHelper from "./../Helpers/PrescriptionHelper.js";
import PrescriptionService from "./../APIs/PrescriptionService.js";
import ReportService from '../APIs/ReportService.js'
import "./../css/Main.css";

class DashboardComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			prescriptions: [],
			records: {
				totalToday: "25",
				attendedToday: "10",
				normalTime: "1h 30m",
				fastTime: "30m"
			},
			showStatus: false,
			showImport: false,
			showReport: false,
			timeoutId: null
		};

		this.showTask = this.showTask.bind(this);
		this.getTasks = this.getTasks.bind(this);
	}

	componentDidMount() {
		const action = PrescriptionLineService.getUserAction()
		const role = AuthenticationService.getLoggedInUserRole()
		const line = PrescriptionLineService.getPrescriptionLine()

		if (action === 'normal' && line === "none") {
			this.props.history.push("/linea/" + btoa("error"));
		} else if (role === 'secretaria' || action === 'none') {
			this.props.history.push("/bienvenido/" + btoa('error'));
		}

		const showStatus = ['tecnico', 'admin'].indexOf(role) >= 0
		const showImport = ['ventana', 'admin'].indexOf(action) >= 0
		const showReport = ['admin'].indexOf(action) >= 0
		const fileReport = ReportService.getDailyReport()

		this.setState({ showStatus, showImport, showReport, fileReport })
		this.getTasks(action, line)
	}

	componentWillUnmount() {
		clearTimeout(this.state.timeoutId)
	}

	showTask(id) {
		this.props.history.push(`/receta/detalles/${btoa(id)}`);
	}

	getTasks(action, line) {
		let prescriptions = PrescriptionService.getAllPrescriptionListByAction(action, line)
		let timeoutId = setTimeout(() => {
			this.getTasks(action, line)
		}, 180000)

		const records = {
			totalToday: PrescriptionService.getRecordsLogByStatus("total"),
			attendedToday: PrescriptionService.getRecordsLogByStatus("completed"),
			normalTime: PrescriptionService.getTimeByLine("normal"),
			fastTime: PrescriptionService.getTimeByLine("fast")
		}

		this.setState({ records, prescriptions, timeoutId })
	}

	render() {
		return (
			<div className="domain">
				<div className="row w-100">
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
									<p>Tiempo estimado recetas urgentes</p>
								</div>
								<div className="col-sm">
									<button
										type="button"
										className="btn btn-secundary btn-caja"
										readOnly
									>
										{this.state.records.normalTime}
									</button>
									<p>Tiempo estimado recetas no urgentes</p>
								</div>
							</div>
						</div>
						{this.state.showImport && <div className="container">
							<div className="text-center mb-2">
								<button type="button" className="btn btn-primary" onClick={() => alert("Importando recetas...") /*this.getFromCaja()*/}>Importar recetas</button>
							</div>
						</div>}
						{this.state.showReport && <div className="container">
							<div className="text-center mb-2">
								<a href={this.state.fileReport} target="_blank" rel="noopener noreferrer" download>
									<button type="button" className="btn btn-primary">Descargar reporte diario</button>
								</a>
							</div>
						</div>}
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
