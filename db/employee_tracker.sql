DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;

CREATE TABLE department (
id INT NOT NULL auto_increment,
name VARCHAR(30),
PRIMARY KEY (id)
);

CREATE TABLE role (
id INT NOT NULL auto_increment,
title VARCHAR(30),
salary DEC(10,2),
department_id INT,
PRIMARY KEY(id),
FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee (
id INT NOT NULL auto_increment,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id int,
manager_id int,
PRIMARY KEY(id),
FOREIGN KEY(role_id) REFERENCES role(id),
FOREIGN KEY(manager_id) REFERENCES employee(id)
);