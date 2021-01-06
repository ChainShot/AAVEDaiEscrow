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

document.getElementById("deploy").addEventListener("click", newContract);
