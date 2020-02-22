import mysql

class DatabaseMySql:

    def __init__(self, name='lh_db', user='user1', password='Lamas123', host='104.196.152.154', port='3306'):
        self.name = name
        self.user = user
        self.password = password
        self.host = host
        self.port = port
        self.connection = None

    def connect(self):
        self.connection = mysql.connect(
            self.host,
            self.name,
            self.user,
            self.password
        ) #default port is 3306
        return 1
    
    def close_connection(self):
        self.connection.close()
        return 1

    def execute(self, query):
        cursor = self.connection.cursor()
        cursor.execute(query)
        row = cursor.fetchone()
        cursor.close()
        return row

# if "__name__" == "__main__":
    

    
