// Ensure that the document is fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
    // Check if Web3 is injected by the browser (MetaMask)
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    } else {
        alert('Please install MetaMask to use this application.');
    }

    // Function to handle voting
    const voteForm = document.getElementById('voteForm');
    if (voteForm) {
        voteForm.addEventListener('submit', async function (event) {
            event.preventDefault(); // Prevent the default form submission

            const candidateId = document.getElementById('candidateId').value;
            const voterId = document.getElementById('voterId').value;

            // Get the user's Ethereum account
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];

            // Interact with the smart contract
            const votingContractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
            const votingContractABI = [ /* ABI goes here */ ]; // Replace with your contract ABI

            const votingContract = new web3.eth.Contract(votingContractABI, votingContractAddress);

            try {
                // Call the vote function from the smart contract
                await votingContract.methods.vote(candidateId).send({ from: account });
                alert('Vote cast successfully!');
                window.location.href = '/success'; // Redirect to success page
            } catch (error) {
                console.error(error);
                alert('An error occurred while casting your vote. Please try again.');
            }
        });
    }
});