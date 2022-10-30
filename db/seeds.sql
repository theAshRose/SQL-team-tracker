INSERT INTO depot (name)
VALUES ("Home Depot");

INSERT INTO depot_role (title, salary, depot_id)
VALUES ("Manager", "70000", 1),
       ("Cashier", "20000", 2);

INSERT INTO depot_employee (first_name, last_name, role_id, manager_id)
VALUES ("Bill", "Lumbergh", 1, null),
       ("Jeffy", "Smith", 2, 1);
       
       
       