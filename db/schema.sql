DROP DATABASE IF EXISTS depot_db;
CREATE DATABASE depot_db;

USE depot_db;

CREATE TABLE depot (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);

CREATE TABLE depot_role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  depot_id INT,
  FOREIGN KEY (depot_id) REFERENCES depot(id)
);

CREATE TABLE depot_employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES depot_role(id),
  manager_id INT NULL,
  FOREIGN KEY (manager_id) REFERENCES depot_employee(id)
);
