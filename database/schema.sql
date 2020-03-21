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

-- 35.227.67.4
-- port: 3306
-- database name: 'lh_db'
-- user: 'user1'
-- password: 'Lamas123'


create table QuizRecord (
    recordId SERIAL NOT NULL primary key,
    uid BIGINT UNSIGNED NOT NULL,
    quizId BIGINT UNSIGNED NOT NULL,
    score FLOAT,
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
create table Question (
    questionId SERIAL NOT NULL primary key,
    question varchar(10000) NOT NULL,
    questionType INTEGER NOT NULL,
    option1 varchar(1000),
    option2 varchar(1000),
    option3 varchar(1000),
    option4 varchar(1000),
    correctAnswer INT
);
-- questionType: 0: Multiple Choice, 1: Long Answer

create table QuizContains (
    quizId BIGINT UNSIGNED NOT NULL,
    questionId BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY(quizId, questionId),
    FOREIGN KEY (quizId) REFERENCES Quiz(quizId),
    FOREIGN KEY (questionId) REFERENCES Question(questionId)
);

create table Quiz (
    quizId SERIAL NOT NULL primary key,
    author BIGINT UNSIGNED NOT NULL,
    title varchar(300) NOT NULL,
    numQuestions INTEGER NOT NULL,
    FOREIGN KEY (author) REFERENCES Recruiter(uid)
);

create table HasTags (
    quizId BIGINT UNSIGNED NOT NULL,
    tag varchar(20) NOT NULL,
    PRIMARY KEY(quizId, tag),
    FOREIGN KEY (quizId) REFERENCES Quiz(quizId)



create table QuizRecord (
    recordId SERIAL NOT NULL primary key,
    uid BIGINT UNSIGNED NOT NULL,
    quizId BIGINT UNSIGNED NOT NULL,
    score FLOAT,
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

--NOTE: Trigger exists that will make a record with (uid, NULL, NULL, ...) 
--      for Student or Recruiter after registration (insert into AppUser).
create table Student (
    uid BIGINT UNSIGNED NOT NULL primary key,
    studyLevel varchar(20),
    school varchar(300),
    profilePicturePath varchar(1000),
    resumePath varchar(1000),
    bio varchar(3000),
    FOREIGN KEY (uid) REFERENCES AppUser(uid)
);

create table Recruiter (
    uid BIGINT UNSIGNED NOT NULL primary key,
    company varchar(300),
    title varchar(100),
    profilePicturePath varchar(1000),
    bio varchar(3000),
    FOREIGN KEY (uid) REFERENCES AppUser(uid)
);


---------------
-- Sprint 4
---------------

create table PostingContains (
    postingId BIGINT UNSIGNED NOT NULL, --add foreign key constraint
    quizId BIGINT UNSIGNED NOT NULL --add foreign key constraint
    PRIMARY KEY(postingId, quizId),
    FOREIGN KEY (postingId) REFERENCES Posting(postingId),
    FOREIGN KEY (quizId) REFERENCES Quiz(quizId)
);

create table Posting (
    postingId SERIAL NULL primary key,
    recruiterId BIGINT UNSIGNED NOT NULL,
    title varchar(300) NOT NULL,
    description varchar(3000),
    stateOrProvince varchar(100) NOT NULL,
    FOREIGN KEY (recruiterId) REFERENCES Recruiter(uid)
);