import psycopg2

# Connection with a postgres database
conn = psycopg2.connect(
    dbname='Indice',
    user='read_only_user',
    password='436700',
    host="localhost",
    port="5432"
)
# Create cursor for more performe to register data
cur = conn.cursor()
# Execute SQL command
def get_data():
    cur.execute("Select matter_name from matters")
    data = cur.fetchall()
    print(data)
    return data




