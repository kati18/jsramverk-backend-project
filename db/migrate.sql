--
-- By kati18 for project in course jsramverk, webbprogrammering BTH.
-- 2020-2120

-- Commands for Cygwin terminal to create/restore database from scratch:
-- cd db
-- sqlite3 texts.sqlite
-- .read migrate.sql
-- .exit


-- Drop tables if already exists:
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS start;
DROP TABLE IF EXISTS translog;

-- Creates table start in database texts.sqlite:
CREATE TABLE IF NOT EXISTS start (
    site VARCHAR(100) NOT NULL,
    description VARCHAR(200) NOT NULL,
    trade_info_not_logged_in VARCHAR(200) NOT NULL,
    trade_info_logged_in VARCHAR(200) NOT NULL
);

-- Creates table users in database texts.sqlite:
CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    liquid_assets DEFAULT 0.00,
    amount_trattkantarell DEFAULT 0,
    amount_stensopp DEFAULT 0,
    UNIQUE(email)
);

-- Creates table translog in database texts.sqlite:
CREATE TABLE IF NOT EXISTS translog (
    email VARCHAR(255) NOT NULL,
    transaction_time VARCHAR(30),
    mushroom VARCHAR(25) NOT NULL,
    -- amount INT(10),
    amount VARCHAR(10),
    realtime_price REAL(10)
);


-- Inserts data into table accounts in database texts.sqlite:
-- INSERT INTO users VALUES('micke.18@test.se', 10000.00, 5, 8);
-- Inserts data into table me in database texts.sqlite:
INSERT INTO start VALUES("Welcome to Katja's fake trading site!", 'Here you can trade with Trattkantareller and Stensoppar.', 'To see your acccount, trade and/or see your trade logg you need to be registered and logged in.', 'To see your account go to My account, to trade go to Trade and to see your trade logg go to My trade logg.');
