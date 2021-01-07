import Escrow from './artifacts/contracts/Escrow.sol/Escrow';
import IERC20 from './artifacts/contracts/interfaces/IERC20.sol/IERC20';
import {ethers} from 'ethers';

// you can find a list of all AAVE contracts deployed to kovan here:
// https://docs.aave.com/developers/deployed-contracts
const poolAddress = "0xE0fBa4Fc209b4948668006B2bE61711b7f465bAe";
const aDaiAddress = "0x6dDFD6364110E9580292D9eCC745F75deA7e72c8";
const daiAddress = "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD";

export default async function deploy(arbiter, beneficiary, value) {
  await ethereum.enable();
  const provider = new ethers.providers.Web3Provider(ethereum);
  const network = await provider.getNetwork();

  if(network.chainId === 42) {
    try {
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();

      const escrowAddress = ethers.utils.getContractAddress({
          from: signerAddress,
          nonce: (await provider.getTransactionCount(signerAddress)) + 1,
      });

      const dai = new ethers.Contract(daiAddress, IERC20.abi, signer);
      const tx = await dai.approve(escrowAddress, value);
      await tx.wait();

      const factory = new ethers.ContractFactory(Escrow.abi, Escrow.bytecode, signer);
      return factory.deploy(poolAddress, aDaiAddress, daiAddress, arbiter, beneficiary, value);
    }
    catch(ex) {
      alert(ex.message);
    }
  }
  else {
    alert("Invalid network, please choose Kovan!");
  }
}
