import time, math, random, string
from database_auth import DatabaseAuth

def is_authenticated(uid, token, timeout):
    '''
    Checks if the supplied uid has been (re)authenticated within the past timeout mins.
    Accesses the Authentication Database
    '''

    auth = get_auth(uid, token)
    # exists is the rows in the return statement
    if (auth == []):
        return False

    last_authenticated = auth[0][2]
    if (((time.time() - last_authenticated) // 60) > timeout):
        remove_auth_uid(uid)
        return False
    else:
        update_auth_timestamp(uid)
        return True

def get_auth(uid, token):
    db = DatabaseAuth()
    db.connect()
    select_query = f'SELECT * FROM AuthTable WHERE uid = "{uid}" AND token = "{token}";'
    rows = db.execute(select_query)
    db.close_connection()
    return rows

def insert_auth_uid(uid, token):

    db = DatabaseAuth()
    db.connect()
    exists_query = f'SELECT * FROM AuthTable WHERE uid = {uid};'
    rows = db.execute(exists_query)
    if (rows != []):
        db.execute(f'DELETE FROM AuthTable WHERE uid = {uid};')
    insert_query = f'INSERT INTO AuthTable (uid, token, timestamp) VALUES ({uid}, "{token}", {math.ceil(time.time())})'
    db.execute(insert_query)
    db.close_connection()
    return

def remove_auth_uid(uid):
    db = DatabaseAuth()
    db.connect()
    delete_query = f'DELETE FROM AuthTable WHERE uid = {uid};'
    db.execute(delete_query)
    db.close_connection()
    return

def update_auth_timestamp(uid):
    db = DatabaseAuth()
    db.connect()
    update_query = f'UPDATE AuthTable SET timestamp = {math.ceil(time.time())} WHERE uid = {uid};'
    db.execute(update_query)
    db.close_connection()
    return

def generate_auth_token():
    return ''.join(random.choice(string.ascii_letters) for m in range(50))