INSERT INTO depot (name)
VALUES 
("Management"),
("Sales"),
("Cleaning"),
("Botanical")
;

INSERT INTO depot_role (title, salary, depot_id)
VALUES 
("Manager", "70000", 1),
("Garden Manager", "50000", 4),
("Cashier", "20000", 2),
("Hardware Specialist", "20000", 2),
("Janitor", "15000", 3),
("Gardener", "10000", 4)
;

INSERT INTO depot_employee (first_name, last_name, role_id, manager_id)
VALUES 
("Bill", "Lumbergh", 1, null),
("Adrianne", "McRat", 5, null),
("Jeffy", "Smith", 2, 1),
("Roger", "Adams", 2, 1),
("Jorge", "Rivera", 3, 1),
("Carlos", "Alvarez", 3, 1),
("Stephanie", "Fambrini", 4, 1)
;
       