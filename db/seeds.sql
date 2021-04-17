INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
  (id, 'Ronald', 'Jones',2, manager_id),
  (id,'Ginny', 'Max', 8, manager_id),
  (id,'Bonnie', 'Gaveston', 8, manager_id),
  (id,'Charles', 'Parkerson', 7, manager_id),
  (id,'Frank', 'Mansfield', 1, manager_id),
  (id,'Dora', 'Explorer', 5, manager_id),
  (id,'Edward', 'ScizzHands', 3, manager_id),
  (id,'Sunny', 'Summers', 2, manager_id),
  (id,'Octavia', 'Oceania', 4, manager_id),
  (id,'Missy', 'Misdimenor', 6, manager_id),
  (id,'Tom', 'Hanksmen', 4, manager_id),
  (id,'Mark', 'Zumm', 8, manager_id);

INSERT INTO department (id, department_name)
VALUES
  (id, 'Accounting'),
  (id, 'Public Relations'),
  (id, 'Engineering'),
  (id, 'Development'),
  (id, 'Sales');

INSERT INTO role_employee (id, title, salary, department_id )
VALUES
  (id, 'CPA', 100000, 1),
  (id, 'Accounting Clerk', 45000, 1),
  (id, 'Lead Engineer', 120000, 2),
  (id, 'Engineer', 95000, 2),
  (id, 'Public Relations Manager', 85000, 3),
  (id, 'HR Manager', 100000, 4),
  (id, 'Lead Sales', 125000, 5),
  (id, 'Sales', 80000, 5);
 
