const Voting = artifacts.require("Voting");

contract("Voting", (accounts) => {
    let votingInstance;

    before(async () => {
        votingInstance = await Voting.deployed();
    });

    it("should initialize with two candidates", async () => {
        const candidateCount = await votingInstance.candidatesCount();
        assert.equal(candidateCount, 2, "There should be two candidates");
    });

    it("should allow a voter to cast a vote", async () => {
        const candidateId = 1; // Assuming candidate ID 1 exists
        const voterId = accounts[1]; // Use the second account as the voter

        // Cast a vote
        await votingInstance.vote(candidateId, { from: voterId });

        // Check if the vote was counted
        const candidate = await votingInstance.candidates(candidateId);
        assert.equal(candidate.voteCount.toNumber(), 1, "Candidate 1 should have one vote");
    });

    it("should not allow a voter to vote twice", async () => {
        const candidateId = 1; // Assuming candidate ID 1 exists
        const voterId = accounts[1]; // Use the same account as the voter

        try {
            // Attempt to cast a second vote
            await votingInstance.vote(candidateId, { from: voterId });
            assert.fail("The voter should not be able to vote twice");
        } catch (error) {
            assert(error.message.includes("You have already voted."), "Expected error message not received");
        }
    });

    it("should only allow the owner to add candidates", async () => {
        const candidateName = "Candidate 3";

        // Attempt to add a candidate from a non-owner account
        try {
            await votingInstance.addCandidate(candidateName, { from: accounts[2] }); // Use a different account
            assert.fail("Only the owner should be able to add candidates");
        } catch (error) {
            assert(error.message.includes("Only the owner can add candidates."), "Expected error message not received");
        }

        // Add a candidate from the owner account
        await votingInstance.addCandidate(candidateName, { from: accounts[0] });

        // Check if the candidate was added
        const candidateCount = await votingInstance.candidatesCount();
        assert.equal(candidateCount.toNumber(), 3, "There should now be three candidates");
    });
});