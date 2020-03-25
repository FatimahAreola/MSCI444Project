from flask import Flask, request, json
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
    return "hey"

# sample json body
# [
# 	{
# 	"lectureContent" : "blah blah blah",
# 	"textbookID" : 1
# 	}
# ]
@app.route('/match')
def match():
    # lectureContent = request.args.get('lecture')
    # textbookID = request.args.get('textbook')
    # return 'the lecturecontent is {}'.format(lectureID)
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

    # url = 'http://api.cortical.io:80/rest/text/keywords?retina_name=en_associative'
    # myobj = {req_data['lectureContent']}
    # myobj = {'body': lectureContent}

    # keywords = requests.post(url, data = myobj)

    textbookID = req_data['textbookID']

    query = "SELECT textbookContent FROM Textbook WHERE textbookID = {};".format(textbookID)
    
    cursor.execute(query)

    textbookSectionsToMatch = cursor[0].split('<div>')

    body=[]

    for section in textbookSectionsToMatch:
        term = []
        term.append({'term' : lectureContentToMatch})
        term.append({'term' : section})
        body.append(term)
    
    url = 'http://api.cortical.io:80/rest/compare/bulk?retina_name=en_associative'
    myobj = body

    matchValue = requests.post(url, data = myobj)

    result = []

    for value in matchValue:
        if value>80:
            result.append()


    return 'the lecturecontent is {}'.format()