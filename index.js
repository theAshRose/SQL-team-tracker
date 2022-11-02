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
//these modules imported are all lowercase because of the main function controlling this program called 'prompt1' down on what is currently line 90. see there for details
const db = mysql.createConnection(//our mySQL connection, we could not export this object sadly and had to repost it on every page
    {
        host: 'localhost',
        user: 'root',
        password: 'HatsuneMiku',
        database: 'depot_db'
    },
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
        "View Employees by Manager",
    ]
}]

function viewemployeesbymanager() { //just in case the extra credit didnt work off the main "view all employees"
    db.query(`SELECT emp.first_name, emp.last_name,
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

function viewalldepartments() {
    db.query('SELECT * FROM depot', function (err, res) {
        console.table(res);
        prompt1()
    })
}

function viewallroles() { //viewing roles nice and neat
    db.query(`SELECT depot_role.title AS Position, depot_role.depot_id AS Role_ID, depot.name AS Sector, depot_role.salary AS Salary 
              FROM depot_role JOIN depot 
              ON depot_role.depot_id = depot.id`, function (err, res) {
        console.table(res);
        prompt1()
    })
}
//very strenuous bit here displaying our table
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
              ON empM.id=emp.manager_id`, function (err, res) { //i had to split depot_employee into two sections to properly call all of the tables
        console.table(res);
        prompt1()
    })
}

function quit() {
    process.exit()
}

function prompt1() { //this function is the reason most of our functions are NOT camelCase
    inquirer.prompt(initialPrompt).then(userInput => {
        let promptVal = Object.values(userInput) //
        let babyFunction = promptVal.toString().toLowerCase().replace(/\s/g, '') + "()"//getting that value ready to be executed as a function
        eval(babyFunction);//we use the "evil" eval method to instantiate a string as a function instead of using a long list of switch cases or if statements
    })
}

function init() {
    prompt1()
}
init()

module.exports = prompt1;