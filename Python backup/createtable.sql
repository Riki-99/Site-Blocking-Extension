-- The email in users will be after logging in through their gmail account
CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, email TEXT);
-- For hourwise blocking i.e. this many hours in one day
CREATE TABLE hourwise (entry_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER REFERENCES users(id), site_addr TEXT, hour INTEGER, min INTEGER);
-- For timewise blocking i.e. from this time to this time
CREATE TABLE timewise (entry_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER REFERENCES users(id), site_addr TEXT, start_hour INTEGER, start_min INTEGER, end_hour INTEGER, end_min INTEGER);
--In pomodoro the worktime is calculated in seconds
CREATE TABLE pomodoro (entry_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER REFERENCES users(id), site_addr TEXT, worktime INTEGER, breaktime INTEGER);


 