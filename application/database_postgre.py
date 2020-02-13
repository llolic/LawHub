# import psycopg2

class DatabasePostgre:

    def __init__(self, name='lh_db', user='user1', password='Lamas123', host='34.66.215.42', port='5432'):
        self.name = name
        self.user = user
        self.password = password
        self.host = host
        self.port = port
        self.connection = None

    def connect(self):
        try:
            self.connection = psycopg2.connect(
            self.name,
            self.user,
            self.password,
            self.host,
            self.port
        )
        except:
            return -1
        return 1
    
    def close_connection(self):
        try:
            self.connection.close()
        except:
            return -1
        return 1

    def execute(self, query):
        cursor = self.connection.cursor()
        cursor.execute(query)
        row = cursor.fetchone()
        cursor.close()
        return row

# if "__name__" == "__main__":
    

    
