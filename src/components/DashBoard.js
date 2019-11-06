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
      type: "",
      userId: "",
      description: "",
      medic: "",
      companyName: "",
      hash: "",
      registradoPor: this.props.nameCompany,
      date: "",
      generated: false,
      loading: false,
      hash: "",
      hashTransaction: "",
      network: "",
      pdfDoc: false,
      apiResponse: "",
      loadingIPFS: false
    };
  }

  componentDidMount() {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    this.setState({
      //Setting the value of the date time
      date:
        date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec
    });
  }

  handleInputChange(event) {
    if (event.target.name === "identificacion") {
      this.setState({ userId: event.target.value });
    } else if (event.target.name === "descripcion") {
      this.setState({ description: event.target.value });
    } else if (event.target.name === "medico") {
      this.setState({ medic: event.target.value });
    }
  }

  registrar() {
    this.setState({ loading: true });
    if (
      this.state.userId !== "" &&
      this.state.description !== "" &&
      this.state.medic !== ""
    ) {
      var typeValue = this.refs.certificadoType.value;
      console.log(typeValue);
      var actualTypeValue = "";
      if (typeValue === "afiliacion") {
        actualTypeValue = "Certificado de Afiliación";
      } else if (typeValue === "enfermedad") {
        actualTypeValue = "Certificado de Enfermedad";
      } else if (typeValue === "resultados") {
        actualTypeValue = "Certificado de resultado de examen";
      } else if (typeValue === "medicamentos") {
        actualTypeValue = "Certificado de entrega de medicamentos";
      } else if (typeValue === "incapacidades") {
        actualTypeValue = "Certificado de incapacidad laboral";
      } else if (typeValue === "cirugia") {
        actualTypeValue = "Certificado de cirugia";
      }
      console.log(actualTypeValue);
      this.setState({ type: actualTypeValue }, () => {
        this.sendCertificate();
      });
    } else {
      console.log("ERROOOOR, ALGUN CAMPO ESTA VACIOOO MK!!");
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  sendCertificate = async () => {
    this.web3 = new Web3(window.web3.currentProvider);
    var networkType = await this.web3.eth.net.getNetworkType();
    if (networkType === "rinkeby") {
      networkType = "Ethereum";
    } else if (networkType === "private") {
      networkType = "RSK";
    }
    this.setState({ network: networkType });
    // afiliacion, idCertificado, descripcion, certificador, entidad
    var transactionHash = await ContractManager.certificationHash(
      this.state.type,
      this.state.userId,
      this.state.description,
      this.state.medic,
      this.state.companyName
    );
    console.log(transactionHash);
    this.setState({ hashTransaction: transactionHash });
    this.getHash();
  };

  getHash = async () => {
    const hashCertificado = await ContractManager.getHash();
    console.log(hashCertificado);
    this.setState({ hash: hashCertificado , loading: false, generated: true});
  };

  aceptar(){
    this.props.history.push(`/certificaciones`);
  }

  render() {

    if (this.state.pdfDoc) {
      return (
        <div id="divToPrint">
          <Col md="4" sm="3" xs="3">
            <div class="card">
              <div class="card-block">
                <h4 class="card-title">Certificado Generado</h4>
                <p class="card-text"> Tipo de certificado: {this.state.type}</p>
                <p class="card-text">
                  Cedula del paciente: {this.state.userId}
                </p>
                <p class="card-text">
                  {" "}
                  Descripción del certificado: {this.state.description}
                </p>
                <p class="card-text">
                  {" "}
                  Medico emisor del certificado: {this.state.medic}
                </p>
                <p class="card-text">
                  {" "}
                  Hash del certificado: {this.state.hash}
                </p>
                <p class="card-text">
                  {" "}
                  Hash de la transaccion: {this.state.hashTransaction}
                </p>
                <p class="card-text">
                  {" "}
                  Red de la transaccion: {this.state.network}
                </p>
              </div>
            </div>
          </Col>
        </div>
      );
    }

    if (this.state.network !== "" && this.state.loading) {
      return (
        <div className="login10-form">
          <h3> Generando certificado en la red {this.state.network}</h3>
          <Loader type="Rings" color="#00BFFF" height="150" width="150" />
        </div>
      );
    }

    if (this.state.loading) {
      return (
        <div className="login10-form">
          <h3> Generando certificado...</h3>
          <Loader type="Rings" color="#00BFFF" height="150" width="150" />
        </div>
      );
    }

    if (this.state.generated) {
      return (
        <div class="login10-form">
            <div class="card">
              <div class="card-block">
                <h3 class="card-title">Certificado Generado</h3>
                <h4 class="card-text"> Tipo de certificado: {this.state.type}</h4>
                <h4 class="card-text">
                  Cedula del paciente: {this.state.userId}
                </h4>
                <h4 class="card-text">
                  {" "}
                  Descripción del certificado: {this.state.description}
                </h4>
                <h4 class="card-text">
                  {" "}
                  Medico emisor del certificado: {this.state.medic}
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
              <button
                class="login100-form-btn botonlogin"
                name="funcion"
                value="1"
                onClick={this.printFile.bind(this)}
              >
                Generar PDF
              </button>
            </CardBody>
            </div>
        </div>
      );
    }

    return (
      <div class="login10-form">
        <hr />
        <h2>Nuevo Certificado</h2>
        <div class="wrap-input100 validate">
          <text> Elija el tipo de certificado que desea generar</text>
          <select ref="certificadoType" name="certificado" className="input100">
            <option value="afiliacion">Afiliación</option>
            <option value="enfermedad">De enfermedades</option>
            <option value="resultados">Resultados de examenes</option>
            <option value="medicamentos">Entrega de medicamentos</option>
            <option value="incapacidades">Incapacidades laborales</option>
            <option value="cirugia">De cirugias</option>
          </select>
          <span class="focus-input100"></span>
        </div>

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
            name="descripcion"
            placeholder="Descripción del certificado"
            onChange={this.handleInputChange.bind(this)}
          />
          <span class="focus-input100"></span>
          <span class="symbol-input100">
            <i class="fa fa-file-medical" aria-hidden="true"></i>
          </span>
        </div>

        <div class="wrap-input100 validate-input">
          <input
            class="input100"
            name="medico"
            placeholder="Persona que certifica"
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
            placeholder={this.state.registradoPor}
            value={this.state.registradoPor}
            disabled
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
            Generar Certificado
          </button>
        </div>
        <br />
        <hr />
        <div class="container-login100-form-btn">
          <button
            class="back-form-btn botonlogin"
            name="funcion"
            value="1"
            onClick={this.goBack.bind(this)}
          >
            Volver
          </button>
        </div>
      </div>
    );
  }
}

export default AddCertificate;