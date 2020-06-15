import React, { Component } from "react";
import AuthenticationService from "./../APIs/AuthenticationService.js";

class LogoutComponent extends Component {
  componentDidMount() {
    AuthenticationService.registerSuccessfullLogout();

    setTimeout(() => {
      this.props.history.push("/");
    }, 2000);
  }

  render() {
    return (
      <div className="domain">
        <h2>Hasta luego</h2>
        <p>Gracias por utilizar nuestra app</p>
      </div>
    );
  }
}

export default LogoutComponent;
