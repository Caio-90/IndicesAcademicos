from functions import create_dataframe, get_files, parse_df, save_db


def start():
    files = get_files()
    for file in files:
        df = create_dataframe(file)
        df_parsed = parse_df(df)
        save_db(df_parsed, file)

    return

start()