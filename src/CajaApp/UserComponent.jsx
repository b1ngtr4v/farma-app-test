import React, { Component } from 'react'
import Password from './PasswordComponent'
import UserService from './../APIs/UserService.js'
import AuthenticationService from './../APIs/AuthenticationService.js'

class UserComponent extends Component {
	constructor(props) {
		super(props)

		this.state = {
			roles: [],
			username: '',
			name: '',
			lastname: '',
			ident: '',
			phone: '',
			mail: '',
			job: '',
			role: '',
			error: null,
			updated: null
		}

		this.handleTextChange = this.handleTextChange.bind(this)
		this.validatePhone = this.validatePhone.bind(this)
		this.validateMail = this.validateMail.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleBack = this.handleBack.bind(this)
	}

	componentDidMount() {
		const username = AuthenticationService.getLoggedInUser()
		const userInfo = UserService.getUser(username)

		this.setState(userInfo)
	}

	handleTextChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    validatePhone(e) {
    	const phone = e.target.value

    	if(phone.length) {
			/^(\d){4}-(\d){4}$/.test(phone) ? e.target.setCustomValidity("") : e.target.setCustomValidity("invalid")
    	}
    }

    validateMail(e) {
    	const mail = e.target.value

    	if(mail.length) {
			// eslint-disable-next-line 
			/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.test(mail) ? e.target.setCustomValidity("") : e.target.setCustomValidity("invalid")			
    	}
    }

    handleBack() {
		this.props.history.push("/dashboard")
	}

    handleSubmit(e) {
    	e.preventDefault()
		e.stopPropagation()
		this.setState({ updated: null, error: null })

    	if(e.target.checkValidity()) {
			const user = {...this.state}
			delete user.roles
			delete user.updated
			delete user.error
			
			if(UserService.updateUser(user)) {
				this.setState({ updated: true })
			} else {
				this.setState({ error: true })
			}
		}

		e.target.classList.add('was-validated')
    }

	render() {
		return (
			<div className="domain">
				<h3>Perfil de usuario</h3>
				<div className="container col-xs-12 col-sm-12 col-md-6 col-lg-6 text-left mt-4">
					{this.state.updated && <div className="alert alert-success text-center">Perfil actualizado correctamente</div>}
					{this.state.error && <div className="alert alert-warning text-center">No se logr&oacute; actualizar, intente m&aacute;s tarde</div>}
					<form className="needs-validation" noValidate onSubmit={this.handleSubmit}>
						<div className="form-group">
							<div className="form-row">
								<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
									<label htmlFor="username">Usuario</label>
									<div className="input-group">
										<div className="input-group-prepend">
											<span className="input-group-text" id="sp-username">@</span>
										</div>
										<input type="text" className="form-control" id="username" value={this.state.username} readOnly />
									</div>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="form-row my-2">
								<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
									<label htmlFor="name">Nombre</label>
									<input type="text" className="form-control" id="name" maxLength="60" onChange={this.handleTextChange} value={this.state.name} required />
								</div>
								<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
									<label htmlFor="lastname">Apellidos</label>
									<input type="text" className="form-control" id="lastname" maxLength="60" onChange={this.handleTextChange} value={this.state.lastname} required />
								</div>
							</div>
							<div className="form-row my-2">
								<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
									<label htmlFor="ident">C&eacute;dula</label>
									<input type="text" className="form-control" id="ident" maxLength="20" value={this.state.ident} readOnly />
								</div>
								<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
									<label htmlFor="phone">Tel&eacute;fono</label>
									<input type="text" className="form-control" id="phone" minLength="9" maxLength="9" onChange={this.handleTextChange} onBlur={this.validatePhone} value={this.state.phone} required />
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
									<input type="email" className="form-control" id="mail" maxLength="30" onChange={this.handleTextChange} onBlur={this.validateMail} value={this.state.mail} required />
									<div className="invalid-feedback">
										Ingrese un correo v&aacute;lido (usuario@servidor.com).
									</div>
								</div>
							</div>
							<div className="form-row my-2">
								<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
									<label htmlFor="job">Puesto de trabajo</label>
									<input type="text" className="form-control" id="job" maxLength="40" onChange={this.handleTextChange} value={this.state.job} required />
								</div>
								<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
									<label htmlFor="role">Tipo de acceso</label>
									<input type="text" className="form-control" id="role" value={this.state.role} readOnly />
								</div>
							</div>
						</div>
						<button type="submit" className="btn btn-success float-right mb-2">Guardar Perfil</button>
					</form>
					<Password handleBack={this.handleBack} />
				</div>
			</div>
		)
	}
}

export default UserComponent
