from flask import Flask, request, json
import mysql.connector
import requests
import re

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

    lectureContentToMatch = req_data[0]['lectureContent']

    textbookID = req_data[0]['textbookID']

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
        if value['weightedScoring']>0.80:
            result.append(textbookSectionsToMatch[index])

    return {'matches': result}