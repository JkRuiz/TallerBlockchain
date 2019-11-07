import React from "react";
import Loader from "react-loader-spinner";
import ContractManager from "./smartContract/ContractManager";
import Web3 from "web3";
import {
  CardBody,
  Col
} from "reactstrap";

class AddCertificate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      registradoPor: "",
      generated: false,
      loading: false,
      hash: "",
      hashTransaction: "",
    };
  }

  handleInputChange(event) {
    if (event.target.name === "identificacion") {
      this.setState({ userId: event.target.value });
    } else if (event.target.name === "registradoPor") {
      this.setState({ registradoPor: event.target.value });
    }
  }

  registrar() {
    this.setState({ loading: true });
    if (
      this.state.userId !== "" &&
      this.state.registradoPor !== "" 
    ) {
      this.sendCertificate();
    } else {
      console.log("Error, algun capo esta vacio");
    }
  }

  sendCertificate = async () => {
    this.web3 = new Web3(window.web3.currentProvider);
    var transactionHash = await ContractManager.certificationHash(
      this.state.userId,
      this.state.registradoPor
    );
    this.setState({ hashTransaction: transactionHash });
    this.getHash();
  };

  getHash = async () => {
    const hashCertificado = await ContractManager.getHash();
    console.log(hashCertificado);
    this.setState({ hash: hashCertificado , loading: false, generated: true});
  };

  aceptar(){
    this.setState({loading: false, generated: false});
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="login10-form">
          <h3> Generando afiliacion...</h3>
          <Loader type="Rings" color="#00BFFF" height="150" width="150" />
        </div>
      );
    }

    if (this.state.generated) {
      return (
        <div class="login10-form">
            <div class="card">
              <div class="card-block">
                <h3 class="card-title">Afiliacon Generada</h3>
                <h4 class="card-text">
                  Cedula del alumno: {this.state.userId}
                </h4>
                <h4 class="card-text">
                  {" "}
                  Institucion: {this.state.registradoPor}
                </h4>
                <h4 class="card-text">
                  {" "}
                  Hash del certificado: {this.state.hash}
                </h4>
                <h4 class="card-text">
                  {" "}
                  Hash de la transaccion: {this.state.hashTransaction}
                </h4>
                <h4 class="card-text">
                  {" "}
                  Red de la transaccion: {this.state.network}
                </h4>
              </div>
            <CardBody className="d-flex justify-content-between align-items-center">
              <button
                class="login100-form-btn botonlogin"
                name="funcion"
                value="1"
                onClick={this.aceptar.bind(this)}
              >
                Aceptar
              </button>
            </CardBody>
            </div>
        </div>
      );
    }

    return (
      <div class="login10-form">
        <hr />
        <h2>Afiliación de estudiante</h2>
        <div class="wrap-input100 validate">
        <div class="wrap-input100 validate-input">
          <input
            class="input100"
            name="identificacion"
            placeholder="Numero de identificación"
            onChange={this.handleInputChange.bind(this)}
          />
          <span class="focus-input100"></span>
          <span class="symbol-input100">
            <i class="fa fa-id-card" aria-hidden="true"></i>
          </span>
        </div>

        <div class="wrap-input100 validate-input">
          <input
            class="input100"
            name="registradoPor"
            placeholder="Institucion a la cual esta afiliado"
            onChange={this.handleInputChange.bind(this)}
          />
          <span class="focus-input100"></span>
          <span class="symbol-input100">
            <i class="fa fa-hospital" aria-hidden="true"></i>
          </span>
        </div>

        <div class="container-login100-form-btn">
          <button
            class="login100-form-btn botonlogin"
            name="funcion"
            value="1"
            onClick={this.registrar.bind(this)}
          >
            Generar Afiliación
          </button>
        </div>
      </div>
      </div>
    );
  }
}

export default AddCertificate;