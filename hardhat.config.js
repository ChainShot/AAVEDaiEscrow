require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

// use the forking URL if one is available
let networks = {}
if(process.env.FORKING_URL) {
  networks.hardhat = {
    forking: {
      url: process.env.FORKING_URL,
      blockNumber: 11395144
    }
  }
}

module.exports = {
  solidity: "0.7.5",
  networks: {
    ...networks,
    // configure new networks down here
  },
  paths: {
    artifacts: "./app/artifacts",
  }
};
