INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ( 'Ronald', 'Jones',2, 1),
  ('Ginny', 'Max', 8, 2),
  ('Bonnie', 'Gaveston', 8, 1),
  ('Charles', 'Parkerson', 7, 2),
  ('Frank', 'Mansfield', 1, 1),
  ('Dora', 'Explorer', 5, 2),
  ('Edward', 'ScizzHands', 3, 1),
  ('Sunny', 'Summers', 2, 2),
  ('Octavia', 'Oceania', 4, 1),
  ('Missy', 'Misdimenor', 6, 2),
  ('Tom', 'Hanksmen', 4, 1),
  ('Mark', 'Zumm', 8, 2);

INSERT INTO department (department_name)
VALUES
  ('Accounting'),
  ('Public Relations'),
  ('Engineering'),
  ('Development'),
  ('Sales');

INSERT INTO role_employee (title, salary, department_id )
VALUES
  ( 'CPA', 100000, 1),
  ( 'Accounting Clerk', 45000, 1),
  ( 'Lead Engineer', 120000, 2),
  ( 'Engineer', 95000, 2),
  ( 'Public Relations Manager', 85000, 3),
  ( 'HR Manager', 100000, 4),
  ( 'Lead Sales', 125000, 5),
  ( 'Sales', 80000, 5);
 
