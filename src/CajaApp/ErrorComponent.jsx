import React from "react";

function ErrorComponent() {
  console.log(process.env.PUBLIC_URL);
  return (
    <div className="domain">
      <p>Se ha presentado un error.</p>
      <img
        className="d-block"
        src="help.png"
        alt="ayuda"
        style={{ margin: "auto", width: "100px" }}
      />
      <p>Contacta a alguien por ayuda!</p>
    </div>
  );
}

export default ErrorComponent;
