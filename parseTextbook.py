from flask import Flask
import mysql.connector
config = {
    'user': 'root',
    'password': 'sherlockeD123',
    'host': 'db',
    'port': '3306',
    'database': 'MSCI'
}

###I started this section and then realized this might be something that is done through the form for users?
###and the form would call the code I've written below?
connection = mysql.connector.connect(**config)

sqlStatement = connection.cursor()

cursor.execute('''INSERT INTO MSCI.Textbook (textbookName, textbookContent, textbookFNAuthor, textbookLNAuthor, textbookEdition)
                Values (#Carla to insert here?  
                textbookContentToStore
                #I actually don't know what I am doing here I am so sorry
                )
''')

connection.commit()
connection.close()
app = Flask(__name__)

@app.route('/pdfParse')
import io
from pdfminer.converter import TextConverter
from pdfminer.pdfinterp import PDFPageInterpreter
from pdfminer.pdfinterp import PDFResourceManager
from pdfminer.pdfpage import PDFPage
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
    for page in extractTextByPage(pdfPath):
        print("<div")
        print(page)  
        print("</div>")
        print()
#Example:  print(extractText('C:/Users/fatim/Desktop/MSCI444Project/ob_textbook.pdf')) 
#Example:  print(extractText('C:/Users/fatim/Desktop/MSCI444Project/Different_Approaches_to_Organizations_UPDATED.pdf'))        
textbookContentToStore = extractText('PDF filePath')


