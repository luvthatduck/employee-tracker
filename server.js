const mysql = require('mysql2');
const express = require('express');
const inquirer = require('inquirer');
const cTable = require('console.table');
const PORT = process.env.PORT || 3001;
const app = express();
// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());


// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '3blindMice',
  database: 'employees'
});

// db.connect(function (err) {
  
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);

//   connection.query("SELECT * from role", function (error, res) {
//     showRoles = res.map(role => ({ name: role.title, value: role.id }))
//   })
//   connection.query("SELECT * from department", function (error, res) {
//     showDepartments = res.map(dep => ({ name: dep.name, value: dep.id }))
//   })
//   connection.query("SELECT * from employee", function (error, res) {
//     // console.log(error, res);
//     showEmployee = res.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
//   })

//   start();
// })






// db.connect(function(err) {
//   if(err)throw err;
//   const sql = "SELECT * FROM employee"; 
//   db.query(sql,function(err, result){
//     if (err) throw err;
//     console.table(result)
//   })
// });





// db.query(`SELECT * FROM role_employee`, (err, rows) => {
//   console.log(rows);
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Builds complete employee table
// async function showEmployee() {
//   console.log(' ');
//   db.query('SELECT e.id, e.first_name AS First_Name, e.last_name AS Last_Name, title AS Title, salary AS Salary, name AS Department, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id', (err, res) => {
//     if (err) throw err;
//     console.table(res);
//     start();

//   });
// };

// Builds a table which shows existing roles and their departments
// async function showRoles() {
//   console.log(' ');
//   db.query('SELECT id, title, salary, name AS department FROM role r LEFT JOIN department d ON department_id = d.id', (err, res) => {
//     if (err) throw err;
//     console.table(res);
//     start();
//   })
// };

// Builds a table which shows existing departments
// function showDepartments() {
// db.connect(function(err){
//     if(err) throw err}
//   const sql = "SELECT * FROM employee";
//   db.query(sql, function (err, result) {
//     if (err) throw err;
//     console.table(result)
//     start();
//   })
// });

// }
// function showDepartments() {

  // const sql = `SELECT * FROM department`;
  // db.query(sql, (err, rows) => {
  //   if (err){
  //     console.log('There was an error. ' + err)
  //     return; 
  //   }
  //  return console.table(rows)
  // })
  // start();
// }


// inquirer prompts 
// start prompt view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
function start() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'FakeCompany Employee Database',
      message: "Which would you like to view?",
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role'
      ]
    },
      ]).then(answers => {
        switch (answers.choices) {
          // prompt to view all departments
          // will return table departments and department ids
          case 'View all Departments':
            showDepartments();
            break;
          // prompt to view all roles
          // will return a table with job title, role id, department, salary
          case "View all roles":
            showRoles();
            break;
          // prompt to view all employees
          // will return a table of employee data, id, first, last, job title
          // department, salaries and manager
          case "View all employees":
            showEmployee();
            break;
          // add a department 
          // promted to add name of department then will add to table 
          case "Add a department":
            addDepartment();
            break;
          // add a role 
          // prompted to enter the name, salary, and department for the role and that role is added to the database
          case "Add a role":
            addRole();
            break;
          // add an employee 
          // prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
          case "Add an employee":
            addEmployee();
            break;
          // update an employee role
          // prompted to select an employee to update and their new role and this information is updated in the database 
          case "Update an employee role":
            editRole();
            break;
        }
      });
    };

//   ]).then(answers => {
//     if (answers.choices === 'View all Departments') {
//       showDepartments();
//     } else if (answers.choices === "View all roles") {
//       showRoles();
//     } else if (answers.choices === "View all employees") {
//       showRoles();
//     } else if (answers.choices === "View all employees") {
//       showEmployee();
//     } else if (answers.choices === "Add a department") {
//       addDepartment();
//     } else if (answers.choices === "Add a role") {
//       addRole();
//     } else if (answers.choices === "Add a department") {
//       addDepartment();
//     } else if (answers.choices === "Add an employee") {
//       addEmployee();
//     } else if (answers.choices === "Update an employee role") {
//       editRole();
//     }
//   });
// };

start();
app.listen(PORT, () => {
  // console.log(`Server running on port ${PORT}`);
});