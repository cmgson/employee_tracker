INSERT INTO department (name) VALUES ("Marketing");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Legal");
INSERT INTO department (name) VALUES ("Accounting");

INSERT INTO role (title, salary, department_id) VALUES ("Social Media Manager", 51406, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Digital Marketing Director", 90405, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Support", 44877, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Account Sales Manager", 62236, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Junior Software Developer", 64056, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Senior Software Developer", 92345, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Chief Technology Officer", 44877, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Legal Analyst", 51918, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Legal Director", 134000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("General Accountant", 56560, 5);
INSERT INTO role (title, salary, department_id) VALUES ("Accounting Supervisor", 87827, 5);

INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Uzi", "Vert", null, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Jack", "Harlow", null, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("lil", "Flip", null, 7);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Jake", "Roberts", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Felipe", "Esparza", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Boaty", "McBoatFace", null, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Blake", "Sheldon", null, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Dave", "Chappelle", null, 8);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Willy", "Beaman", null, 9);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Sasha", "Cohen", null, 11);