import React, { Component } from "react";
import Password from "./PasswordComponent";

class UserPasswordComponent extends Component {
  handleBack = () => {
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div className="domain">
        <h3>Cambio de contrase&ntilde;a</h3>
        <div className="container col-xs-12 col-sm-12 col-md-6 col-lg-6 text-left mt-4">
          <Password handleBack={this.handleBack} />
        </div>
      </div>
    );
  }
}

export default UserPasswordComponent;
