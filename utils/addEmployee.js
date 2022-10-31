const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require("inquirer");
const prompt1 = require("../index")

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'HatsuneMiku',
        database: 'depot_db'
    },
    console.log(`Accessing depot_db...`)
);

const addEmployeePrompt = [{
    name: "role",
    message: "enter employee role",
    choices: [
        "Manager",
        "Cashier",
        "Hardware Specialist",
        "Janitor",
        "Gardener"
    ]
}, {
    name: "first_name",
    message: "enter employee first name",
    type: "input"
}, {
    name: "last_name",
    message: "enter employee last name",
    type: "input"
}, {
    name: "manager",
    message: "enter employee's manager(if any)'",
    type: "list",
    choices: [
        "none",
        "Bill Lumbergh"
    ]
},
];


function addemployee() {
    const prompt1 = require("../index")
    let finalInput = [];
    inquirer.prompt(addEmployeePrompt).then(userInput => {
        finalInput.push(userInput)
        // let roleID = finalInput.role_id; console.log(roleID+"DEFINED")
        // db.query('SELECT role_id FROM depot_role WHERE title = ?', roleID, function (err, res) {
        //     console.table(res+"table1");
        //     console.log(roleID+"roleID")
        //     let managerID = finalInput.manager_id; console.log(managerID)
        //     db.query('SELECT manager_id FROM depot_role WHERE title = ?', managerID, function (err, res) {
        //         console.table(res+"table2");
        //         console.log(roleID+"managerID")
        db.query('INSERT INTO depot_employee (first_name, last_name, manager_id) VALUES ('
            + finalInput.first_name + ', ' + finalInput.last_name + ', ' +1+'); INSERT INTO depot_role (title) VALUES ('+finalInput.role+') ',
            function (err, res) {
                db.query('SELECT * FROM depot_employee', function (err, res) { console.table(res) })
                console.table(res + "table");
                console.log(res + "array")
                prompt1()
            });
    })
}


module.exports = addemployee;