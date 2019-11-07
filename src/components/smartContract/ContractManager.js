import { abiEthereum } from "./abiEthereum";
import Web3 from "web3";

const addressEtheruem="0x10740937ba7af6feef8be45a51cc6e0c0e8e20dd";

var abi = ""
var address = ""

class ContractManager {
  contract = null;

  // Proceso para conectarse a la red e inicializar el contrato
  ensureContractInitialised = async () => {
    if (this.contract) return;

    if (
      typeof window.web3 === "undefined" ||
      typeof window.web3.currentProvider === "undefined"
    ) {
      throw new Error(
        "You must install Metamask and log in in order to use this application."
      );
    }

    this.web3 = new Web3(window.web3.currentProvider);

    const network = await this.web3.eth.net.getNetworkType();
    abi = abiEthereum
    address = addressEtheruem
    console.log("Publicando con la red de Ethereum")

    this.contract = new this.web3.eth.Contract(
      abi,
      address
    );
  };

  // Metodo para obtener el hash generado de la afiliacion
  getHash = async () => {
    await this.ensureContractInitialised();
    console.log("Calling the method...");
    return await this.contract.methods.getHash().call();
  };

  // Metodo para generar el hash de la afiliación en la red blockchain
  certificationHash = async (id, entidad) => {
    var transHash = "";
    await this.ensureContractInitialised();

    const from = await new Promise((resolve, reject) => {
      // Se elige la primera cuenta de las que se tienen en metamask
      window.web3.eth.getAccounts((err, accounts) => {
        if (err) return reject(err);
        resolve(accounts[0]);
      });
    });
    console.log(from);
    await this.contract.methods.generateHashVal(id, entidad).send({from}).on("transactionHash", function(hash) {
        console.log(hash);
        transHash = hash;
      });
    return transHash;
  };
}

export default new ContractManager();
