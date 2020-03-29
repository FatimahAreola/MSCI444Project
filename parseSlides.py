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

cursor.execute('''INSERT INTO MSCI.Lecture (lectureName, lectureContent)
                Values (#Carla to insert here?  
                lectureContentToStore
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
def extract_text_by_page(pdf_path):
    with open(pdf_path, 'rb') as fh:
        for page in PDFPage.get_pages(fh, 
                                      caching=True,
                                      check_extractable=True):
            resource_manager = PDFResourceManager()
            fake_file_handle = io.StringIO()
            converter = TextConverter(resource_manager, fake_file_handle)
            page_interpreter = PDFPageInterpreter(resource_manager, converter)
            page_interpreter.process_page(page)
            
            text = fake_file_handle.getvalue()
            yield text
    
            # close open handles
            converter.close()
            fake_file_handle.close()
def extract_text(pdf_path):
    for page in extract_text_by_page(pdf_path):
        print("<div")
        print(page)  
        print("</div>")
        print()
#Example:  print(extract_text('C:/Users/fatim/Desktop/MSCI444Project/ob_textbook.pdf')) 
#Example:  print(extract_text('C:/Users/fatim/Desktop/MSCI444Project/Different_Approaches_to_Organizations_UPDATED.pdf'))        
lectureContentToStore = extract_text('PDF filePath')


