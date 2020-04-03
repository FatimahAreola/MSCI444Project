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
    pages = extractTextByPage
    page_string = []
    for page in pages:
        page_string.append(f"<div>{page}</div>")
    final_string = ' '.join(page_string)
    return(final_string)
