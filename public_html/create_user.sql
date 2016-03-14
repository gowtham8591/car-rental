/***********************************************************
* Create the database named contactdb and all of its tables
************************************************************/

DROP DATABASE IF EXISTS contactdb;

CREATE DATABASE contactdb;

USE contactdb;

CREATE TABLE User (
  UserID INT NOT NULL AUTO_INCREMENT,
  FirstName VARCHAR(50),
  LastName VARCHAR(50),
  EmailAddress VARCHAR(50),
  
  PRIMARY KEY(UserID) 
);


INSERT INTO User 
  (FirstName, LastName, EmailAddress)
VALUES 
  ('Carl', 'Buck', 'carl@gmail.com'),
  ('Monica', 'Henderson', 'monica@npu.edu'), 
  ('Peter', 'Lee', 'peter@yahoo.com');