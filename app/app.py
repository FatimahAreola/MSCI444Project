config = {
    'user': 'root',
    'password': 'root',
    'host': 'db',
    'port': '3306',
    'database': 'MSCI'
}
connection = mysql.connector.connect(**config)
