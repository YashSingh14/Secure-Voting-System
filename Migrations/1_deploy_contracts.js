// Import the Voting contract
const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
  // Deploy the Voting contract
  deployer.deploy(Voting);
};