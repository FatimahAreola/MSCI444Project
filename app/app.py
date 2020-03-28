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
    print('Login')
    email = get_post_data("email")
    password = get_post_data("password")
    table = get_post_data("table")
    user_id = checkLoginId(email, table)
    print('user id')
    print(user_id)
    if not user_id:
        return jsonify(message = 'Unauthorized'), 401
    else:
        return jsonify(user_id), 200

def checkLoginId(email, table):
    print('table')
    print(table)
    if table=="Student":
        print('STUDENT TABLE')
        user_email="studentEmail"
        user_id = "studentID"
    elif table =="Instructor":
        user_email="instructorEmail"
        user_id = "instructorID"
    query = f"select {user_id} from {table} where {user_email}=%s"
    params = (email,)
    with DbSelector() as db:
        db.cursor.execute(query, params)
        results = db.cursor.fetchone()
    if not results:
        return False
    else:
        return {"user_id": results[0]}
@app.route('/courses', methods=["POST"])
def findCourses():
    print('Find courses')
    email = get_post_data('user_id')
    sql = "select c.courseName from StudentCourse as sc join Course as c using(courseAccessCode) where studentID=%s"
    params = (email,)
    with DbSelector() as db:
        db.cursor.execute(sql, params)
        rows = db.cursor.fetchall()
    courses = [row.courseName for row in rows]
    return jsonify({"courses": courses}), 200






