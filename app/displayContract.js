import {ethers} from 'ethers';

export default async function displayContract(id, contract, arbiter, beneficiary, value) {
  const buttonId = `approve-${id}`;

  const container = document.getElementById("container");
  container.innerHTML += createHTML(buttonId, arbiter, beneficiary, contract.address, value);

  contract.on('Approved', () => {
    document.getElementById(buttonId).className = "complete";
    document.getElementById(buttonId).innerText = "✓ It's been approved!";
  });

  document.getElementById(buttonId).addEventListener("click", async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const tx = await contract.connect(signer).approve();
    await tx.wait();
  });
}

function createHTML(buttonId, arbiter, beneficiary, address, value) {
  return `
    <div class="existing-contract">
      <ul className="fields">
        <li>
          <div> Arbiter </div>
          <div> ${arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> ${beneficiary} </div>
        </li>
        <li>
          <div> View on Etherscan: </div>
          <div>
            <a href="https://kovan.etherscan.io/address/${address}" target="_blank">Etherscan</a>
          </div>
        </li>
        <li>
          <p>
            It may take a moment for the contract to appear on Etherscan. <br/>
            Once it does, it will have a balance of ${ethers.utils.formatEther(value)} aDai. <br/>
            And it's earning interest!
          </p>
        </li>
        <div class="button" id="${buttonId}">
          Approve Escrow
        </div>
      </ul>
    </div>
  `;
}
