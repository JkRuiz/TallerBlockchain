import "./Login.css";
import React from "react";
import logo from "../images/logoHackaton.png";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userPass: ""
    };
  }

  ingresar() {
    this.props.history.push(`/DashBoard`);
  }

  render() {
    return (
      <div className="limiter">
        <div className="container-login100">

            <div className="login100-form">

              <div className="wrap-input100 validate-input">
                <input
                  className="input100"
                  type="text"
                  name="username"
                  placeholder="Email del usuario"
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="La contraseña no es válida"
              >
                <input
                  className="input100"
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>

              <div className="container-login100-form-btn">
                <button
                  className="login100-form-btn botonlogin"
                  onClick={this.ingresar.bind(this)}
                >
                  Iniciar
                </button>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default LogIn;
