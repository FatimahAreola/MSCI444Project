from flask import Flask, request, json, jsonify
import re
import mysql.connector
import os
import io
import requests
from pdfminer.converter import TextConverter
from pdfminer.pdfinterp import PDFPageInterpreter
from pdfminer.pdfinterp import PDFResourceManager
from pdfminer.pdfpage import PDFPage
import random
import string
import datetime

parent_dir = "/app"
directory = "textbooks"
uploads_dir = os.path.join(parent_dir, directory)
os.makedirs(uploads_dir, exist_ok=True)

lecture_directory = "lectures"
uploads_dir = os.path.join(parent_dir, lecture_directory)
os.makedirs(lecture_directory, exist_ok=True)

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
    return "hey"

# sample json body
# [
# 	{
# 	"lectureContent" : "blah blah blah",
# 	"textbookID" : 1
# 	}
# ]
@app.route('/match', methods=["POST"])
def match():
    req_data = request.get_json()
    config = {
        'user': 'root',
        'password': 'sherlockeD123',
        'host': 'db',
        'port': '3306',
        'database': 'MSCI'
    }
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()

    lectureContentToMatch = req_data['lectureContent']

    textbookID = req_data['textbookID']

    query = "SELECT textbookContent FROM Textbook WHERE textbookID = %s;"
    
    cursor.execute(query, [textbookID])
    
    content = None

    for textbookContent in cursor:
        content = textbookContent[0]

    textbookSectionsToMatch = re.findall("<div>(.*?)</div>", content)

    body=[]

    for section in textbookSectionsToMatch:
        term = []
        term.append({"term" : lectureContentToMatch})
        term.append({"term" : section})
        body.append(term)
    
    url = 'http://api.cortical.io:80/rest/compare/bulk?retina_name=en_associative'

    matchValue = requests.post(url, json=body)

    matchValue = json.loads(matchValue.text)

    result = []

    for index,value in enumerate(matchValue):
        if value['weightedScoring']>0.50:
            result.append(textbookSectionsToMatch[index])
    print('match result')
    print(result)

    return jsonify({'matches': result}), 200

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
        user_email="studentEmail"
        user_id = "studentID"
    elif table =="Instructor":
        user_email="instructorEmail"
        user_id = "employeeID"
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
    sql = "select c.courseID, c.courseName, c.courseAccessCode from StudentCourse as sc join Course as c using(courseAccessCode) where studentID=%s"
    params = (email,)
    with DbSelector() as db:
        db.cursor.execute(sql, params)
        rows = db.cursor.fetchall()
    courses = []
    for row in rows:
        courses.append({"course_id":row[0].decode(), "course_name":row[1].decode(),"course_access_code":row[2].decode()})
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
    print('Course Access code')
    print(course_access_code)
    sql = "select l.lectureID, l.lectureName from Lecture as l join LectureCourse as c using(lectureID) where c.courseAccessCode=%s"
    params = (course_access_code,)
    with DbSelector() as db:
        db.cursor.execute(sql, params)
        rows = db.cursor.fetchall()
    print('rows')
    print(rows)
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
    print('lecture id1')
    print(lecture_id)
    sql = "select lectureContent from Lecture where lectureID=%s"
    params = (lecture_id, )
    lecture_slides = []
    with DbSelector() as db:
        db.cursor.execute(sql, params)
        result = db.cursor.fetchone()
    if result:
        matches = re.findall("<div>(.*?)</div>", result[0].decode())
        for match in matches:
            lecture_slides.append(match.strip())
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
    author_fname = request.form['textbookFName']
    author_lname = request.form['textbookLName']
    user_id = request.form["user"]
    pdf_path = os.path.join(uploads_dir, textbook_file.filename)
    textbook_file.save(pdf_path)
    textbook_string = extractText(pdf_path)
    print(type(textbook_string))
    textbook_id = insert_into_textbook(textbook_string, textbook_file, textbook_name, textbook_edition, author_fname, author_lname)
    insert_into_student_textbook_tbl(textbook_id, user_id)
    return jsonify({"textbook_id": textbook_id, "textbook_name": textbook_name}), 200

def extractTextByPage(pdfPath):
    with open(pdfPath, 'rb') as fh:
        #loops through each page
        for page in PDFPage.get_pages(fh, 
                                      caching=True,
                                      check_extractable=True):
            rManager = PDFResourceManager()
            fileHandle = io.StringIO()
            converter = TextConverter(rManager, fileHandle)
            pageInterpreter = PDFPageInterpreter(rManager, converter)
            pageInterpreter.process_page(page)
            text = fileHandle.getvalue()
            yield text
            # close open handles
            converter.close()
            fileHandle.close()

def extractText(pdfPath):
    pages = extractTextByPage(pdfPath)
    page_string = []
    for page in pages:
        page_string.append(f"<div>{page}</div>")
    final_string = ' '.join(page_string)
    return(final_string)


def insert_into_textbook(textbook_string, textbook_file, textbook_name, textbook_edition, author_fname, author_lname):
    sql = "insert into Textbook(textbookName,textbookContent,textbookFNAuthor,textbookLNAuthor, textbookEdition) Values(%s,%s,%s,%s,%s)"
    textbook_string = textbook_string.encode('utf8')
    params = (textbook_name, textbook_string, author_fname, author_lname, textbook_edition)
    with DbSelector() as db:
        db.cursor.execute(sql, params)
    with DbSelector() as db:
        db.cursor.execute("select max(textbookID) from Textbook")
        result= db.cursor.fetchone()
    return(result[0])
def insert_into_student_textbook_tbl(textbook_id, user_id):
    sql = "insert into StudentTextbook(studentID, textbookID) Values(%s,%s)"
    params = (user_id, textbook_id)
    with DbSelector() as db:
        db.cursor.execute(sql, params)

@app.route('/textbooks', methods=["POST"])
def findTextbooks():
    student_id = get_post_data("student_id")
    sql = "select t.textbookID, t.textbookName from Textbook as t join StudentTextbook as st using(textbookID) where st.studentID=%s"
    params = (student_id,)
    with DbSelector() as db:
        db.cursor.execute(sql, params)
        rows = db.cursor.fetchall()
    textbooks = []
    for row in rows:
        textbooks.append({"textbook_id":row[0],"textbook_name":row[1].decode()})
    if not rows:
        return jsonify(message="No textbooks"), 401
    return jsonify({"textbooks": textbooks}), 200

@app.route('/course/add', methods=["POST"])
def addCourse():
    instructor_id = get_post_data("instructor_id")
    course_id = get_post_data("course_id")
    course_name = get_post_data("course_name")
    course_description = get_post_data("course_description")
    course_access_code = randomCode(7)
    checkCode(course_id, course_name, course_description, course_access_code)
    insertCourseInstructorRecord(instructor_id, course_access_code)
    course = [{"course_access_code":course_access_code, "course_name": course_name}]
    return jsonify({"courses":course})

def insertCourseInstructorRecord(instructor_id, course_access_code):
    sql = "insert into InstructorCourse(employeeID, courseAccessCode) Values(%s,%s)"
    params=(instructor_id, course_access_code)
    with DbSelector() as db:
        db.cursor.execute(sql, params)

def randomCode(stringLength):
    lettersAndDigits = string.ascii_letters + string.digits
    code =  ''.join(random.choice(lettersAndDigits) for i in range(stringLength))
    return code

def checkCode(course_id, course_name, course_description, course_access_code):
    check = False
    code = randomCode(7)
    while not check:
        sql = """SELECT courseAccessCode FROM Course WHERE courseAccesscode = %s"""
        params = (code,)
        with DbSelector() as db:
            db.cursor.execute(sql, params)
            row = db.cursor.fetchone()
        if not row:
            check = True
            today = datetime.datetime.now()
            params = (course_id, course_name, course_description, course_access_code, today)
            sql = """INSERT INTO Course (courseID, courseName, courseDescription, courseAccessCode, courseStartDate)
        VALUES (%s, %s, %s, %s, %s)"""
            with DbSelector() as db:
                db.cursor.execute(sql, params)

@app.route('/uploadLecture', methods=["POST"])
def addLecture():
    print("adding lecture")
    lecture_file = request.files["lecture"]
    lecture_name = request.form["lecture_name"]
    course_access_code = request.form["course_access_code"]
    today = datetime.datetime.now()
    pdf_path = os.path.join(lecture_directory, lecture_file.filename)
    lecture_file.save(pdf_path)
    lecture_string = extractText(pdf_path)
    lecture_id = insert_lecture(lecture_name, lecture_string)
    insert_course_lecture(lecture_id, course_access_code)
    return jsonify(message="Success"), 200

def insert_lecture(lecture_name, lecture_string):
    lecture_string = lecture_string.encode("utf8")
    sql = "insert into Lecture(lectureName, lectureContent) Values(%s,%s)"
    params=(lecture_name, lecture_string)
    with DbSelector() as db:
        db.cursor.execute(sql, params)
    with DbSelector() as db:
        db.cursor.execute("select max(lectureID) from Lecture")
        result= db.cursor.fetchone()
    return result[0]

def insert_course_lecture(lecture_id,course_id):
    sql = "insert into LectureCourse(lectureID, courseAccessCode) Values(%s, %s)"
    params = (lecture_id, course_id)
    with DbSelector() as db:
        db.cursor.execute(sql, params)

@app.route('/courses/instructor', methods=["POST"])
def findInstructorCourses():
    print('Find courses')
    email = get_post_data('user_id')
    sql = "select c.courseID, c.courseName, c.courseAccessCode from InstructorCourse as ic join Course as c using(courseAccessCode) where employeeID=%s"
    params = (email,)
    with DbSelector() as db:
        db.cursor.execute(sql, params)
        rows = db.cursor.fetchall()
    courses = []
    for row in rows:
        courses.append({"course_id":row[0].decode(), "course_name":row[1].decode(),"course_access_code":row[2].decode()})
    print('courses', courses)
    return jsonify({"courses": courses}), 200
