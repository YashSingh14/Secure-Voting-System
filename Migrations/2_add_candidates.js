const Voting = artifacts.require("Voting");

module.exports = async function (deployer) {
  // Deploy the Voting contract first
  await deployer.deploy(Voting);
  const votingInstance = await Voting.deployed();

  // Add candidates
  await votingInstance.addCandidate("Candidate 1");
  await votingInstance.addCandidate("Candidate 2");
  await votingInstance.addCandidate("Candidate 3");
};