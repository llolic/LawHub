create table AppUser (
    username varchar(100) NOT NULL primary key,
    password varchar(100) NOT NULL, 
    firstName varchar(100) NOT NULL,
    lastName varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    role userType,
    country varchar(100) NOT NULL,
    stateOrProvince varchar(100) NOT NULL,
    city varchar(100) NOT NULL
);

--userType is a custom type that is ENUM('student', 'recruiter')

-- INSERT INTO User VALUES($1, $2, $3, $4, $5, 'student', $6, $7, $8);

-- 34.66.215.42
-- port: 5432
-- database name: 'lh_db'
-- user: 'user1'
-- password: 'Lamas123'