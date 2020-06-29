import React, { Component } from "react"
import PrescriptionHelper from "../Helpers/PrescriptionHelper";
import PrescriptionLineService from "../APIs/PrescriptionLineService";
import AuthenticationService from "../APIs/AuthenticationService";

class LineSelectorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            lines: [],
            error: null
        }

        this.setLine = this.setLine.bind(this)
    }

    componentDidMount() { 
        if(AuthenticationService.getLoggedInUserRole() !== 'tecnico' || PrescriptionLineService.getUserAction() !== 'normal') {
            this.props.history.push('/dashboard')
        }

        let error = false
        let lines = PrescriptionHelper.getLines()

        if (this.props.match.params.status) {
            error = true;
        }

        this.setState({ error, lines })
    }

    setLine(e) {
        const lineSelected = e.target.id
        PrescriptionLineService.registerPrescriptionLine(lineSelected)
        this.props.history.push("/dashboard")
    }

    render() {
        return (
            <div className="domain">
                <div className="container">
                    {this.state.error && (
                        <div className="alert alert-warning" role="alert">
                            Seleccione una l&iacute;nea de trabajo
                        </div>
                    )}
                    <p>Seleccione la l&iacute;nea de acopio</p>
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
                </div>
            </div>
        )
    }
}

export default LineSelectorComponent
