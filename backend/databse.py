import mysql.connector

def init_db():
    conn = mysql.connector.connect(user='your_user', password='your_password', host='localhost', database='voting_db')
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS users (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        username VARCHAR(255) NOT NULL,
                        password VARCHAR(255) NOT NULL,
                        role ENUM('admin', 'candidate') NOT NULL)''')
    cursor.execute('''CREATE TABLE IF NOT EXISTS votes (
                        voter_id VARCHAR(255) NOT NULL,
                        candidate_id INT NOT NULL)''')
    conn.commit()
    cursor.close()
    conn.close()

def add_user(username, password, role):
    conn = mysql.connector.connect(user='your_user', password='your_password', host='localhost', database='voting_db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (username, password, role) VALUES (%s, %s, %s)", (username, password, role))
    conn.commit()
    cursor.close()
    conn.close()

def check_user(username, password, role):
    conn = mysql.connector.connect(user='your_user', password='your_password', host='localhost', database='voting_db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username=%s AND password=%s AND role=%s", (username, password, role))
    result = cursor.fetchone()
    cursor.close()
    conn.close()
    return result is not None

def add_vote(voter_id, candidate_id):
    conn = mysql.connector.connect(user='your_user', password='your_password', host='localhost', database='voting_db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO votes (voter_id, candidate_id) VALUES (%s, %s)", (voter_id, candidate_id))
    conn.commit()
    cursor.close()
    conn.close()

def check_vote(voter_id):
    conn = mysql.connector.connect(user='your_user', password='your_password', host='localhost', database='voting_db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM votes WHERE voter_id=%s", (voter_id,))
    result = cursor.fetchone()
    cursor.close()
    conn.close()
    return result is not None