import React, { Component } from 'react'
import PrescriptionService from './../APIs/PrescriptionService.js'
import './../css/Main.css'

class LimitDashboardComponent extends Component {
	constructor(props) {
		super(props)

		this.state = {
			records: {
				totalToday: 0,
				attendedToday: 0,
				normalTime: 0,
				fastTime: 0
			},
            timeoutId: null
		}
	}

	componentDidMount() {
		this.refreshList()
	}

	componentWillUnmount() {
		clearTimeout(this.state.timeoutId)
	}

	refreshList() {
		const records = {
			totalToday: PrescriptionService.getRecordsLogByStatus("total"),
			attendedToday: PrescriptionService.getRecordsLogByStatus("completed"),
			normalTime: PrescriptionService.getTimeByLine("normal"),
			fastTime: PrescriptionService.getTimeByLine("fast")
		}

		const timeoutId = setTimeout(() => {
            this.refreshList()
        }, 120000)

        this.setState({ timeoutId, records })
	}

	render() {
		return (
			<div className="domain">
				<div className="row w-100">
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						<div className="container">
							<h4>Registros</h4>
							<div className="row mt-4">
								<div className="col-sm col-md">
									<button type="button" className="btn btn-secundary btn-caja" readOnly>{this.state.records.totalToday}</button>
									<p>Recetas recibidas hoy</p>
								</div>
								<div className="col-sm col-md">
									<button type="button" className="btn btn-secundary btn-caja" readOnly>{this.state.records.attendedToday}</button>
									<p>Recetas atendidas hoy</p>
								</div>
							</div>
							<div className="row mt-2">
								<div className="col-sm">
									<button type="button" className="btn btn-secundary btn-caja" readOnly>{this.state.records.fastTime}</button>
									<p>Tiempo estimado de preparación l&iacute;nea r&aacute;pida</p>
								</div>
								<div className="col-sm">
									<button type="button" className="btn btn-secundary btn-caja" readOnly>{this.state.records.normalTime}</button>
									<p>Tiempo estimado de preparación l&iacute;nea alto volumen</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default LimitDashboardComponent
