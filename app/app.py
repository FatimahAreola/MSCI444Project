from flask import Flask, request, jsonify
import re
import mysql.connector
import os

parent_dir = "/app"
directory = "textbooks"
uploads_dir = os.path.join(parent_dir, directory)
os.makedirs(uploads_dir, exist_ok=True)

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
        self.connection.commit()
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
    sql = "select c.courseName, c.courseAccessCode from StudentCourse as sc join Course as c using(courseAccessCode) where studentID=%s"
    params = (email,)
    with DbSelector() as db:
        db.cursor.execute(sql, params)
        rows = db.cursor.fetchall()
    courses = []
    for row in rows:
        courses.append({"course_name":row[0].decode(),"course_access_code":row[1]})
    print('courses', courses)
    return jsonify({"courses": courses}), 200

@app.route('/course/join', methods=["POST"])
def joinCourse():
    print('Joining Courses')
    user_id = get_post_data("user_id")
    access_code = get_post_data("access_code")
    sql = """SELECT courseName FROM Course
    WHERE courseAccesscode = %s"""
    params = (access_code,)
    with DbSelector() as db:
        db.cursor.execute(sql, params)
        rows = db.cursor.fetchone()
    if rows:
        course_name = rows[0].decode()
        sql = """INSERT INTO StudentCourse (studentID, courseAccessCode)
        VALUES (%s, %s)"""
        params = (user_id, access_code)
        with DbSelector() as db:
            db.cursor.execute(sql, params)
        return jsonify({"course": [{"course_name":course_name, "course_access_code":access_code}]}), 200
    else:
        return jsonify(message="Invalid"), 401

@app.route('/lectures', methods=["POST"])
def findLectures():
    print('Find Lectures')
    course_access_code = get_post_data('course_access_code')
    sql = "select l.lectureID, l.lectureName from Lecture as l join LectureCourse as c using(lectureID) where courseAccessCode=%s"
    params = (course_access_code,)
    with DbSelector() as db:
        db.cursor.execute(sql, params)
        rows = db.cursor.fetchall()
    lectures = []
    for row in rows:
        lectures.append({"lecture_id":row[0],"lecture_name":row[1].decode()})
    if not rows:
        return jsonify(message="No lectures"), 401
    return jsonify({"lectures": lectures}), 200

@app.route('/lectureSlides', methods=["POST"])
def findLectureSlides():
    print('Finding lecture slides')
    lecture_id = get_post_data('lecture_id')
    sql = "select lectureContent from Lecture where lectureID=%s"
    params = (lecture_id, )
    lecture_slides = []
    with DbSelector() as db:
        db.cursor.execute(sql, params)
        result = db.cursor.fetchone()
    print('Result')
    print(result)
    if result:
        matches = re.findall("<div>(.*?)</div>", result[0].decode())
        for match in matches:
            lecture_slides.append(match.strip())
        print('Lecture Slides List')
        print(lecture_slides)
        return jsonify({"lecture_content": lecture_slides}), 200
    else:
        return jsonify(message="No lecture slides found"), 401

@app.route('/createAccount', methods=["POST"])
def createAccount():
    print('Creting account')
    first_name = get_post_data('first_name')
    last_name = get_post_data('last_name')
    email = get_post_data('email')
    password = get_post_data('password')
    table = get_post_data('table')
    sql = "SELECT studentEmail FROM Student WHERE studentEmail=%s"
    params = (email, )
    with DbSelector() as db:
        db.cursor.execute(sql, params)
        result = db.cursor.fetchone()
    print('result')
    print(result)
    if result:
        return jsonify(message="A user with this e-mail already exists."), 401
    else:
        sql = f"INSERT INTO {table} ({table.lower()}FName, {table.lower()}LName, {table.lower()}Email, {table.lower()}Password) VALUES(%s, %s, %s, %s)"
        params = (first_name, last_name, email, password)
        with DbSelector() as db:
            db.cursor.execute(sql, params)
        return jsonify(message="Successfully updated resource."), 200

@app.route('/uploadTextbook', methods=["POST"])
def receive_textbook():
    print('RECEIVE TEXTBOOK')
    textbook_file = request.files['textbook']
    textbook_name = request.form['textbookName']
    textbook_edition = request.form['textbookEdition']
    textbook_author_fname = request.form['textbookFName']
    textbook_author_lname = request.form['textbookLName']
    print('File')
    print(textbook_file.filename)
    print(textbook_edition)
    print(textbook_name)
    print(textbook_author_fname)
    print(textbook_author_lname)
    textbook_file.save(os.path.join(uploads_dir, textbook_file.filename))
    return jsonify(message="Success"), 200
