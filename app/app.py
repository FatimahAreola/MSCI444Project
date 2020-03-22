from flask import Flask, request
import mysql.connector
import requests

config = {
    'user': 'root',
    'password': 'sherlockeD123',
    'host': 'db',
    'port': '3306',
    'database': 'MSCI'
}
connection = mysql.connector.connect(**config)
connection.close()
app = Flask(__name__)

@app.route('/hello')
def hello():
    return "Bye!"

@app.route('/match')
def match():
    lectureID = request.args.get('lecture')
    textbookID = request.args.get('textbook')
    # return 'the lecturecontent is {}'.format(lectureID)
    # req_data = request.get_json()
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()

    url = 'http://api.cortical.io:80/rest/text/keywords?retina_name=en_associative'
    myobj = {'body': lectureID}

    keywords = requests.post(url, data = myobj)

    # textbookID = req_data['testbookID']

    query = "SELECT textbookContent FROM Textbook WHERE textbookID = {};".format(textbookID)
    
    data=[]

    cursor.execute(query)

    for (textbookContent) in cursor:
        data.append(textbookContent)

    return 'the lecturecontent is {}'.format(keywords)