create table AppUser (
    uid SERIAL NOT NULL primary key,
    password varchar(255) NOT NULL, 
    firstName varchar(100) NOT NULL,
    lastName varchar(100) NOT NULL,
    email varchar(100) NOT NULL UNIQUE,
    role ENUM('student', 'recruiter') NOT NULL,
    country varchar(100) NOT NULL,
    stateOrProvince varchar(100) NOT NULL,
    city varchar(100) NOT NULL
);

-- INSERT INTO AppUser(password, firstName, lastName, email, role, country, stateOrProvince, city) VALUES($2, $3, $4, $5, 'student', $7, $8, $9);

-- 104.196.152.154
-- port: 3306
-- database name: 'lh_db'
-- user: 'user1'
-- password: 'Lamas123'







create table QuizRecord (
    recordId SERIAL NOT NULL primary key,
    uid BIGINT UNSIGNED NOT NULL,
    quizId BIGINT UNSIGNED NOT NULL,
    score INTEGER,
    hasLongAnswer BOOLEAN NOT NULL,
    FOREIGN KEY (uid) REFERENCES Student(uid),
    FOREIGN KEY (quizId) REFERENCES Quiz(quizId)
);

create table HasLongAnswer (
    recordId BIGINT UNSIGNED NOT NULL,
    questionId BIGINT UNSIGNED NOT NULL,
    answer varchar(3000) NOT NULL,
    PRIMARY KEY(recordId, questionId),
    FOREIGN KEY (recordId) REFERENCES QuizRecord(recordId),
    FOREIGN KEY (questionId) REFERENCES Question(questionId)
);