import sqlite3, os, time, math

class DatabaseAuth:

	def __init__(self):
		self.path = os.getcwd() + r'/auth_db'
		self.connection = None

	def create_auth_table(self):
		self.connect()
		table_query = """create table IF NOT EXISTS AuthTable (
							uid INTEGER NOT NULL,
							token varchar(255) NOT NULL, 
							timestamp INTEGER NOT NULL,
							CONSTRAINT prim_key PRIMARY KEY (uid)
						); """
		self.execute(table_query)
		return
	
	def connect(self):
		try:
			self.connection = sqlite3.connect(self.path)
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
		self.connection.commit()
		rows = cursor.fetchall()
		cursor.close()
		return rows

if __name__ == '__main__':
	db = DatabaseAuth()
	db.connect()
	db.create_auth_table()
	insert_query = f'INSERT INTO AuthTable (uid, token, timestamp) VALUES (0, "testtoken", {math.ceil(time.time())})'
	select_query = 'SELECT * FROM AuthTable WHERE uid = 0 AND token = "testtoken123";'
	# db.execute(insert_query)
	rows = db.execute(select_query)
	print(rows)
	db.close_connection()