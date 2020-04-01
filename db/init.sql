CREATE DATABASE MSCI;
USE MSCI;

CREATE TABLE Student(
studentID INTEGER AUTO_INCREMENT,
studentFName VARCHAR(40),
studentLName VARCHAR(40),
studentEmail VARCHAR(64), /* set this to 64 as that is the standard max length for emails*/
studentPassword VARCHAR(30),
PRIMARY KEY (studentID)
);

CREATE TABLE Textbook(
textbookID INTEGER AUTO_INCREMENT,
textbookName VARCHAR(40),
textbookContent TEXT,
textbookFNAuthor VARCHAR(40),
textbookLNAuthor VARCHAR(40),
textbookEdition INTEGER,
PRIMARY KEY (textbookID)
);

CREATE TABLE Course(
courseID VARCHAR(7),
courseName VARCHAR(50),
courseDescription TEXT,
courseAccessCode INTEGER AUTO_INCREMENT,
courseStartDate DATE,
courseEndDate DATE,
PRIMARY KEY (courseAccessCode)
);

CREATE TABLE Lecture(
lectureID INTEGER AUTO_INCREMENT,
lectureName VARCHAR(50),
lectureContent TEXT,
uploadDate DATE,
PRIMARY KEY (lectureID)
);

CREATE TABLE Instructor(
employeeID INTEGER AUTO_INCREMENT,
instructorFName VARCHAR(40),
instructorLName VARCHAR(40),
instructorEmail VARCHAR(64),
instructorPassword VARCHAR(30),
PRIMARY KEY (employeeID)
);

CREATE TABLE StudentTextbook(
studentID INTEGER,
textbookID INTEGER,
Primary KEY (studentID, textbookID),
FOREIGN KEY (studentID)
    REFERENCES Student(studentID)
    ON DELETE CASCADE,
FOREIGN KEY (textbookID)
    REFERENCES Textbook(textbookID)
    ON DELETE CASCADE
);

CREATE TABLE StudentCourse(
studentID INTEGER,
courseAccessCode INTEGER,
Primary KEY (studentID, courseAccessCode),
FOREIGN KEY (studentID)
REFERENCES Student(studentID)
ON DELETE CASCADE,
FOREIGN KEY (courseAccessCode )
REFERENCES Course(courseAccessCode)
ON DELETE CASCADE
);

CREATE TABLE InstructorCourse(
employeeID INTEGER,
courseAccessCode INTEGER,
Primary KEY (employeeID, courseAccessCode),
FOREIGN KEY (employeeID)
    REFERENCES Instructor(employeeID)
    ON DELETE CASCADE,
FOREIGN KEY (courseAccessCode)
    REFERENCES Course(courseAccessCode)
    ON DELETE CASCADE
);

CREATE TABLE LectureCourse(
lectureID INTEGER,
courseAccessCode INTEGER,
Primary KEY (lectureID, courseAccessCode),
FOREIGN KEY (lectureID)
    REFERENCES Lecture(lectureID)
    ON DELETE CASCADE,
FOREIGN KEY (courseAccessCode)
    REFERENCES Course(courseAccessCode)
    ON DELETE CASCADE
);


