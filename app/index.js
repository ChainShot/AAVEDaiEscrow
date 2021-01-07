import {ethers} from 'ethers';
import deploy from './deploy';
import displayContract from './displayContract';
import "./index.scss";

let contracts = 0;
async function newContract() {
  const beneficiary = document.getElementById("beneficiary").value;
  const arbiter = document.getElementById("arbiter").value;
  const value = ethers.utils.parseEther(document.getElementById("wei").value);
  const contract = await deploy(arbiter, beneficiary, value);
  if(contract) {
    displayContract(++contracts, contract, arbiter, beneficiary, value);
  }
}

async function loadNetworkId() {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const network = await provider.getNetwork();
  document.getElementById("network-id").innerHTML = `connected to ${network.name}`;
}

ethereum.on('chainChanged', loadNetworkId);
loadNetworkId();

document.getElementById("deploy").addEventListener("click", newContract);
