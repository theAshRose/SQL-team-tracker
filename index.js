/////imported node things////////
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require("inquirer");
////////////////my modules//////////////////
const addemployee = require("./utils/addEmployee")
const updateemployeerole = require("./utils/roleUpdate")
const adddepartment = require("./utils/addDepartment")
const addrole = require("./utils/addRole")
const viewtotaldepartmentbudget = require("./utils/totalDeptBudget")

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'HatsuneMiku',
        database: 'depot_db'
    },
    console.log(`Accessing depot_db...`)
);

const initialPrompt = [{
    name: "question1",
    message: "What would you like to do?",
    type: "list",
    choices: [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "Add Employee",
        "Add Department",
        "Update Employee Role",
        "Add Role",
        "Quit",
        "View Total Department Budget", 
        // "Update Employee Manager",
        // "View Employees by Manager",
        // "Remove Depot Roles",
        // "Remove Depot Employees",
        
    ]
}]

function viewalldepartments() {
    db.query('SELECT * FROM depot', function (err, res) {
        console.table(res);
        prompt1()
    })
}

function viewallroles() {
    db.query(`SELECT depot_role.title AS Position, depot_role.depot_id AS Role_ID, depot.name AS Sector, depot_role.salary AS Salary 
              FROM depot_role JOIN depot 
              ON depot_role.depot_id = depot.id`, function (err, res) {
        console.table(res);
        prompt1()
    })
}
//THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewallemployees() {
    db.query(`SELECT emp.id AS ID, emp.first_name, emp.last_name,
              roleA.title AS role, depot.name AS dept_name, roleA.salary,
              CONCAT(empM.first_name,' ', empM.last_name) AS managed_by
              FROM depot_employee AS emp 
              JOIN depot_role AS roleA
              ON emp.role_id = roleA.id
              JOIN depot 
              ON roleA.depot_id = depot.id
              LEFT JOIN depot_employee AS empM 
              ON empM.id=emp.manager_id`, function (err, res) { 
        console.table(res);
        prompt1()
    })
}

function quit() {
    process.exit()
}

function prompt1() {
    inquirer.prompt(initialPrompt).then(userInput => {
        let promptVal = Object.values(userInput)
        let babyFunction = promptVal.toString().toLowerCase().replace(/\s/g, '') + "()"
        eval(babyFunction);
    })
}

function init() {
    prompt1()
}
init()

module.exports = prompt1, db;

//FROM depot_role LEFT JOIN depot ON depot_role.id = depot.id