const mysql = require('mysql2');
const express = require('express');
const inquirer = require('inquirer');
const cTable = require('console.table');
const PORT = process.env.PORT || 3001;
const app = express();
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '3blindMice',
    database: 'employees'
  },
  console.log('Connected to the employees database.')
);

db.query(`SELECT * FROM employees`, (err, rows) => {
  console.log(rows);
});

db.query(`SELECT * FROM department`, (err, rows) => {
  console.log(rows);
});

db.query(`SELECT * FROM role_employee`, (err, rows) => {
  console.log(rows);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// inquirer prompts 
// start prompt view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
function start() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'FakeCompany Employee Database',
      messasge: "Which would you like to view?",
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a role', 'Add an employee', 'Update an employee role'],
    },
  ]).then(function (response) {
    // console.log("RESP", response.position)
    if (response.position === 'View all departments') {
      viewDepartments();
    };
  });

  // prompt to view all departments
  function viewDepartments() {
    console.table.department([
      {
        name: 'foo',
        age: 10
      }, {
        name: 'bar',
        age: 20
      }
    ]);

  };
};

  // will return table departments and department ids
  // prompt to view all roles
  // will return a table with job title, role id, department, salary
  // prompt to view all employees
  // will return a table of employee data, id, first, last, job title
  // department, salaries and manager
  // add a department 
  // promted to add name of department then will add to table 
  // add a role 
  // prompted to enter the name, salary, and department for the role and that role is added to the database
  // add an employee 
  // prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
  // update an employee role
  // prompted to select an employee to update and their new role and this information is updated in the database 





























  start();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });