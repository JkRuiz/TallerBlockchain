import { abiRSK } from "./abiRSK";
import { abiEthereum } from "./abiEthereum";
import Web3 from "web3";

const addressRSK="0xa3929ec7d97e0a44a0313ccdc5157d650423dffd";
const addressEtheruem="0x2D90FD7Cc087cbCe1a18Aa28ddD12cBA2836ECc1";

var address = ""
var abi = ""

class ContractManager {
  contract = null;

  ensureContractInitialised = async () => {
    // Maybe we've already intialised
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
    if (network === "rinkeby") {
      abi = abiEthereum
      address = addressEtheruem
      console.log("Publicando con la red de Ethereum")
    } else if (network === "private"){
      abi = abiRSK
      address = addressRSK
      console.log("Publicando con la red de RSK")
    }

    this.contract = new this.web3.eth.Contract(
      abi,
      address
    );
  };

  getHash = async () => {
    await this.ensureContractInitialised();
    console.log("Calling the method...");
    return await this.contract.methods.getHash().call();
  };

  certificationHash = async (afiliacion, id, descripcioncert, certificador, entidad) => {
    var transHash = "";
    await this.ensureContractInitialised();

    const from = await new Promise((resolve, reject) => {
      // Specifically need to talk to Metamask's web3 here.
      // It's an older version of web3 so it doesn't have the promise API.
      window.web3.eth.getAccounts((err, accounts) => {
        if (err) return reject(err);
        resolve(accounts[0]);
      });
    });
    console.log(from);
    //string afiliacion, uint256 id, string descripcioncert, string certificador, string entidad)
    await this.contract.methods.generateHashVal(afiliacion, id, descripcioncert, certificador, entidad).send({from}).on("transactionHash", function(hash) {
        console.log(hash);
        transHash = hash;
      });
    return transHash;
  };
}

export default new ContractManager();
