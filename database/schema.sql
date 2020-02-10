create table User (
    username varchar(100) NOT NULL primary key,
    password varchar(100) NOT NULL, 
    firstName varchar(100) NOT NULL,
    lastName varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    role ENUM('student', 'recruiter') NOT NULL,
    country varchar(100) NOT NULL,
    stateOrProvince varchar(100) NOT NULL,
    city varchar(100) NOT NULL
);

-- INSERT INTO User VALUES($1, $2, $3, $4, $5, 'student', $6, $7, $8);