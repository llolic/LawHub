import mysql.connector

class DatabaseMySql:

	def __init__(self, name='lh_db', user='user1', password='Lamas123', host='35.227.67.4', port='3306'):
		self.name = name
		self.user = user
		self.password = password
		self.host = host
		self.port = port
		self.connection = None

	def connect(self):
		self.connection = mysql.connector.connect(
			host = self.host,
			database = self.name,
			user = self.user,
			password = self.password) #default port is 3306
		return 1
	
	def close_connection(self):
		self.connection.close()
		return 1

	def execute_select(self, query):
		cursor = self.connection.cursor(buffered=True)
		cursor.execute(query)
		rows = cursor.fetchall()
		cursor.close()
		return rows



	def execute_insert(self, query):
		cursor = self.connection.cursor(buffered=True)
		cursor.execute(query)
		self.connection.commit()
		cursor.close()
		return[]


	def execute(self, query):
		if 'select' in query.lower():
			return self.execute_select(query)
		else:
			return self.execute_insert(query)
if __name__ == '__main__':
	db = DatabaseMySql()
	db.connect()
	# db.create_appuser()
	
	select_query = 'SELECT * FROM AppUser;'

	rows = db.execute(select_query)
	print(rows)
	# for row in rows:
	# 	print(row)
		# print(f"{row[0]}, {row[4]}")
	db.close_connection()
	

	
