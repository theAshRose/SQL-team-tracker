/////imported node things////////
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require("inquirer");
////////////////my modules//////////////////
const addemployee = require("./utils/addEmployee")



const initialPrompt = [{
    name: "question1",
    message: "What would you like to do?",
    type: "list",
    choices: [
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

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'HatsuneMiku',
        database: 'depot_db'
    },
    console.log(`Accessing depot_db...`)
);

function prompt1() {
inquirer.prompt(initialPrompt).then(userInput => {
    let promptVal = Object.values(userInput) //extracting value from user input
    let babyFunction = promptVal.toString().toLowerCase().replace(/\s/g, '')+"()"
    eval(babyFunction);
})
}

function init() {
    prompt1()
}
init()

module.exports = prompt1;