const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');


// inquirer prompts 
// start prompt view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
function start() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'start',
      message: "Welcome to Fake Company Employee Database! Which would you like to view?",
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Quit'
      ]
    },
  ]).then(answers => {
    switch (answers.start) {
      // prompt to view all departments
      // will return table departments and department ids
      case 'View all departments':
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
      //function to quit the program
      case "Quit":
        db.end();
    }
  })
    .catch(error => {
      if (error) {
        console.log(error)
      }
    });
}



function showDepartments() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log('There was an error. ' + err)
      return;
    }
    console.table(rows)

    start();

  })
}

function showRoles() {
  // console.log("what is happeneing!!!")
  const sql = `SELECT role_employee.id, title, salary, department_name FROM role_employee INNER JOIN department ON role_employee.department_id = department.id`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log('There was an error. ' + err)
      return;
    }
    console.table(rows);
    start();
  })
}

function showEmployee() {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, title, salary, employee.manager_id FROM employee INNER JOIN role_employee ON employee.role_id = role_employee.id INNER JOIN employee AS manager ON employee.manager_id = manager.id ORDER BY employee.id ASC`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log('There was an error. ' + err)
      return;
    }
    console.table(rows);
    start();
  })
}

function addDepartment() {
  inquirer.prompt({
    type: 'input',
    name: 'department_name',
    message: 'Please enter the name of the department you would like to add.'
  })
    .then((answers) => {

      db.query(`INSERT INTO department (department_name) VALUES (?)`, answers.department_name, (err) => {
        if (err) {
          console.log('There was an error. ' + err)
          return;
        } else {
          console.log('The department was successfully added to the database!')
        }
      })
      showDepartments();
    })
}

function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'AddRole',
      message: 'Please enter the name of the role.'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Please enter the salary for this role.'
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Please enter the ID of the department that this role belongs to.'
    }
  ])
    .then((answers) => {

      let answersArray = [answers.AddRole, answers.salary, answers.department_id]

      db.query(`INSERT INTO role_employee (title, salary, department_id) VALUES (?,?,?) `, answersArray, (err) => {
        if (err) {
          console.log('There was an error. ' + err)
          return;
        }
        console.log('The employee role was successfully updated!')
        showRoles();
      });
    })

}


function addEmployee() {
  // WHEN I choose to add an employee
  // THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Please enter the first name of the employee.'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Please enter the last name of the employee.'
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Please enter the role ID of the employee.'
    },
    {
      type: 'list',
      name: 'manager_id',
      message: "Please select the employee's manager. 2 = Missy Misdimenor, 3 = Edward ScizzHands",
      choices:
        [
          2,
          3
        ]
    }
  ])
    .then((answers) => {
      db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?) `, [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], (err) => {
        if (err) {
          console.log('There was an error. ' + err)
          return;
        }
        console.log('The employee was successfully added!')
        start();
      });
    })
}

function editRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'employee_id',
      message: 'Please enter the ID of the employee.'
    },
    {
      type: 'input',
      name: 'roles',
      message: 'Please enter the new role ID of the employee.'
    }])
    .then((answers) => {
      db.query(`UPDATE employee SET role_id = ? WHERE id = ?;`, [answers.roles, answers.employee_id], (err) => {
        if (err) {
          console.log('There was an error. ' + err)
          return;
        }
        console.log('The employee was successfully updated!')
        start();
      });
    })


}

start();