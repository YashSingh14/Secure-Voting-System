const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config(); // To load environment variables from a .env file

module.exports = {
  contracts_build_directory: path.join(__dirname, "frontend/src/contracts"),

  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545, // Port where Ganache is running
      network_id: "*", // Match any network id
    },
    ropsten: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_ID}`),
      network_id: 3, // Ropsten's id
      gas: 5500000, // Ropsten has a lower block limit than mainnet
    },
    rinkeby: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`),
      network_id: 4, // Rinkeby's id
      gas: 5500000,
    },
  },

  compilers: {
    solc: {
      version: "0.8.0", // Specify the Solidity version
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};