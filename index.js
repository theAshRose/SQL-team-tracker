/////imported node things////////
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require("inquirer");
////////////////my modules//////////////////
const addemployee = require("./utils/addEmployee")
const updateemployeerole = require("./utils/roleUpdate")

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
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit",
        // "Update Employee Manager",
        // "View Employees by Manager",
        // "Remove Depot Roles",
        // "Remove Depot Employees",
        // "View Total Employee Budget" 
    ]
}]

function viewalldepartments() {
    db.query('SELECT * FROM depot', function(err, res){
        console.table(res);
        prompt1()
    })
}

function viewallroles() {
    db.query('SELECT depot_role.title AS Position, depot_role.depot_id AS Role_ID, depot.name AS Sector, depot_role.salary AS Salary FROM depot_role JOIN depot ON depot_role.depot_id = depot.id', function(err, res){
        console.table(res);
        prompt1()
    })
}

function viewallemployees() {
    db.query('SELECT * FROM depot_employee JOIN depot_role ON depot_role.id = depot_employee.role_id', function(err, res){ //NEED TO ADD DEPARTMENT TO TABLE HERE AND MANAGERS
        console.table(res);
        prompt1()
    })
}

function quit(){
    process.exit()
}

function prompt1() {
inquirer.prompt(initialPrompt).then(userInput => {
    let promptVal = Object.values(userInput) 
    let babyFunction = promptVal.toString().toLowerCase().replace(/\s/g, '')+"()"
    eval(babyFunction);
})
}

function init() {
    prompt1()
}
init()

module.exports = prompt1, db;

//FROM depot_role LEFT JOIN depot ON depot_role.id = depot.id