import sqlite3, os

class DatabaseLite:

	def __init__(self):
		self.path = os.getcwd() + r'/lite_db'
		self.connection = None

	def create_appuser(self):
		self.connect()
		table_query = """create table IF NOT EXISTS AppUser (
							uid INTEGER NOT NULL primary key,
							password varchar(255) NOT NULL, 
							firstName varchar(100) NOT NULL,
							lastName varchar(100) NOT NULL,
							email varchar(100) NOT NULL UNIQUE,
							role varchar(50) NOT NULL,
							country varchar(100),
							stateOrProvince varchar(100),
							city varchar(100)
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
	db = DatabaseLite()
	db.connect()
	db.create_appuser()
	insert_query = '''
	INSERT INTO appuser (uid, password, firstName, lastName, email, role) VALUES (0, "password", "testFirst", "testLast", "test@example.com", "student");
	'''
	insert_query2 = '''
	INSERT INTO appuser (uid, password, firstName, lastName, email, role) VALUES (1, "password1", "testFirst1", "testLast1", "test1@example.com", "student");
	'''
	
	db.execute(insert_query)
	select_query = 'SELECT * FROM appuser;'

	rows = db.execute(select_query)
	print(rows)
	db.close_connection()
	