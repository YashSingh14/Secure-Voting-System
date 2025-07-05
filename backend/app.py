from flask import Flask, request, jsonify, render_template, redirect, url_for
from database import init_db, add_user, check_user, add_vote, check_vote
from web3 import Web3
import json

app = Flask(__name__)
init_db()

# Connect to Ganache
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))

# Load contract
with open('frontend/src/contracts/Voting.json') as f:
    contract_json = json.load(f)
    contract_address = contract_json['networks']['5777']['address']
    contract_abi = contract_json['abi']
    contract = w3.eth.contract(address=contract_address, abi=contract_abi)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/admin', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if check_user(username, password, role='admin'):
            return redirect(url_for('admin_dashboard'))
    return render_template('admin.html')

@app.route('/admin/dashboard')
def admin_dashboard():
    return render_template('admin_dashboard.html')

@app.route('/candidate', methods=['GET', 'POST'])
def candidate_login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if check_user(username, password, role='candidate'):
            return redirect(url_for('vote'))
    return render_template('candidate.html')

@app.route('/vote', methods=['GET', 'POST'])
def vote():
    if request.method == 'POST':
        voter_id = request.form['voter_id']
        candidate_id = int(request.form['candidate_id'])
        
        if not check_vote(voter_id):
            add_vote(voter_id, candidate_id)
            # Interact with smart contract to record the vote
            accounts = w3.eth.accounts
            tx_hash = contract.functions.vote(candidate_id).transact({'from': accounts[0]})
            w3.eth.waitForTransactionReceipt(tx_hash)
            return redirect(url_for('success'))
        return "You have already voted!"
    return render_template('vote.html')

@app.route('/success')
def success():
    return render_template('success.html')

if __name__ == '__main__':
    app.run(debug=True)