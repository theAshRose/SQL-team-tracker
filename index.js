const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require("inquirer")



console.table("consoles a table") //

const initialPrompt = [{
    name: "first question",
    message: "Please select something",
    type: "list",
    choices: ["Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit"]
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
inquirer.prompt(initialPrompt).then(data => {

    //do a foreach loop connecting a boolean to the matching module



    // db.query('SELECT * FROM depot_employee', function (err, res) {
    //     console.log(res);
    // });

})
}


function init() {
    db.query('SELECT * FROM depot_employee', function (err, res) {
        console.table(res);
        console.log(res);
    });
    prompt1()
};
init()