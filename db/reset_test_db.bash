# Creates or nollar the database/the file test.sqlite:
$(> db/test.sqlite)

# Reads the file migrate.sql and writes it to the datase test.sqlite:
cat db/migrate.sql | sqlite3 db/test.sqlite
