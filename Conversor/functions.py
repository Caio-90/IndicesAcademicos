from os import walk, path
import pandas as pd
import psycopg2

from pandas.core.frame import DataFrame

# Connection with a postgres database
conn = psycopg2.connect(
    dbname="Indice",
    user="postgres",
    password="postgres",
    host="localhost",
    port="5432"
)

# SQL instruction for create table if she not exist in database
sql_create_table_matters_if_not_exists = """CREATE TABLE IF NOT EXISTS matters (
	matter_id SERIAL,
	matter_name VARCHAR(255),
	matter_cursor VARCHAR(255),
	matter_year SMALLINT,
 	matter_semester SMALLINT,
	matter_students_active INTEGER,
	matter_10_and_75 DECIMAL,
	matter_74_and_50 DECIMAL,
	matter_49_and_25 DECIMAL,
	matter_24_and_00 DECIMAL,
	matter_approveds DECIMAL,
	matter_fs DECIMAL,
	matter_fi DECIMAL,
	matter_total DECIMAL,
	
	PRIMARY KEY(matter_id)
);"""

# Create cursor for more performe to register data
cur = conn.cursor()
# Execute SQL command
cur.execute(sql_create_table_matters_if_not_exists)
# Make permanent to database
conn.commit()


# Varibel to apont dir of data
dir_content = './content/xlsx/'

# Function to get all files in directory ./content/xlsx


def get_files():
    file_list = []

    for (_, _, files) in walk(dir_content):
        for file in files:
            file_path = path.join(dir_content, file)
            file_list.append(file_path)

    return file_list

# Function to create a dataframe from xlsx file


def create_dataframe(file_path: str):

    file = open(file_path, 'rb')    # Open file
    xlsx = pd.read_excel(file)      # Read file with read_excel of pandas lib
    df = pd.DataFrame(xlsx)         # Create dataframe

    # Return dataframe
    return df

# Function to clean dataframe


def parse_df(df: DataFrame):

    # remove first 3 lines
    df = df.drop([df.index[0], df.index[1], df.index[2]], axis=0)

    # Get the number of rows the dataframe after remove 3 first lines
    df_tam = df.__len__() - 1

    # Remove last 3 lines
    df = df.drop([df.index[df_tam], df.index[df_tam - 1],
                 df.index[df_tam - 2]], axis=0)

    # Rename headers of dataframe to respectvily data
    df.columns = ['INDICE', 'MATERIA', 'ATIVOS',
                  '10~7.5', '7.4~5.0', '4.9~2.5', '2.4~0.0',
                  'APROVADOS', 'FS', 'FI', 'TOTAL']

    return df

# Function to save dataframe in database


def save_db(df: DataFrame, file_path: str):
    filename, _ = path.splitext(file_path)
    splited_filename = filename.split('/')
    cursor_with_year_and_semestre = splited_filename[3].split('-')
    cursor = cursor_with_year_and_semestre[0].strip()
    year = cursor_with_year_and_semestre[1].strip()
    semester = cursor_with_year_and_semestre[2].strip()

    # Reset index of dataframe
    df.reset_index(drop=True, inplace=True)

    # Get length of dataframe
    df_length = df.__len__() - 1

    matters = df.loc[:, 'MATERIA']      # Get matter of dataframe
    actives = df.loc[:, 'ATIVOS']       # Get actives of dataframe
    notes1 = df.loc[:, '10~7.5']        # Get notes1 of dataframe
    notes2 = df.loc[:, '7.4~5.0']       # Get notes2 of dataframe
    notes3 = df.loc[:, '4.9~2.5']       # Get notes3 of dataframe
    notes4 = df.loc[:, '2.4~0.0']       # Get notes4 of dataframe
    approveds = df.loc[:, 'APROVADOS']  # Get approveds of dataframe
    FS = df.loc[:, 'FS']                # Get FS of dataframe
    FI = df.loc[:, 'FI']                # Get FI of dataframe
    total = df.loc[:, 'TOTAL']          # Get total of dataframe

    for i in range(df_length):
        sql_insert_data_to_matter_table = f"""INSERT INTO matters(matter_name, matter_cursor, matter_semester, matter_year, matter_students_active,matter_10_and_75,
        matter_74_and_50, matter_49_and_25, matter_24_and_00, matter_approveds, 
        matter_fs, matter_fi, matter_total) VALUES('{matters[i]}', '{cursor}', {semester}, {year}, {actives[i]}, {notes1[i]}, {notes2[i]}, {notes3[i]}, {notes4[i]}, {approveds[i]}, {FS[i]}, {FI[i]}, {total[i]});"""
        cur.execute(sql_insert_data_to_matter_table)

    conn.commit()