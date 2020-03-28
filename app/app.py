from flask import Flask, request, jsonify
import mysql.connector

class DbSelector():
    def __init__(self):
        self.config = {'user': 'root',
                       'password': 'sherlockeD123',
                       'host': 'db',
                       'port': '3306',
                       'database': 'MSCI'}
    def __enter__(self):
        self.connection = mysql.connector.connect(**self.config)
        self.cursor = self.connection.cursor(prepared=True)
        return self
    def __exit__(self, exc_type, exc_value, exc_traceback):
        self.connection.close()
        self.cursor.close()
app = Flask(__name__)

def get_post_data(name):
    data = request.get_json()
    value = data[name]
    return(value)


@app.route('/hello')
def hello():
    return "hello"
@app.route('/login', methods=["POST"])
def checkLogin():
    print('Login Endpoint')
    email = get_post_data("email")
    password = get_post_data("password")
    table = get_post_data("table")

    if checkLoginId(email, table):
        print('Returning success')
        return jsonify(message = 'Login successful'), 200
    else:
        return jsonify(message = 'No ID found'), 200


def checkLoginId(email, table):
    if table=="Student":
        user_id="studentID"
    elif table =="Instructor":
        user_id="employeeID"
    query = f"select {user_id} from {table} where {user_id}=%s"
    params = (email,)
    with DbSelector() as db:
        db.cursor.execute(query, params)
        results = db.cursor.fetchone()
    if not results:
        print('No results')
        return False
    else:
        print('Results found')
        return True


@app.route('/createAccount')
def createAccount():
    print('Login Endpoint')
    email = get_post_data("email")
    password = get_post_data("password")
    table = get_post_data("table")

    if checkLoginId(email, table):
        print('Returning success')
        return jsonify(message = 'Login successful'), 200
    else:
        return jsonify(message = 'No ID found'), 200


def checkLoginId(email, table):
    if table=="Student":
        user_id="studentID"
    elif table =="Instructor":
        user_id="employeeID"
    query = f"select {user_id} from {table} where {user_id}=%s"
    params = (email,)
    with DbSelector() as db:
        db.cursor.execute(query, params)
        results = db.cursor.fetchone()
    if not results:
        print('No results')
        return False
    else:
        print('Results found')
        return True
