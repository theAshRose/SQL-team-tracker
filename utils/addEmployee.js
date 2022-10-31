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
    type: "list",
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
        "Lumbergh",
        "McRat"
    ]
},
];

function addemployee() {
    const prompt1 = require("../index")
    inquirer.prompt(addEmployeePrompt).then(userInput => {
        db.query(`SELECT * FROM depot_role WHERE title='${userInput.role}'`, function (err, res) {
            let role = res[0].id
            console.log(res + "what im looking for")
            db.query(`SELECT id FROM depot_employee WHERE last_name='${userInput.manager}'`, function (err, res) {
                let manager = res[0].id
                db.query(`INSERT INTO depot_employee (first_name, last_name, role_id, manager_id) VALUES ('${userInput.first_name}', '${userInput.last_name}', ${role}, ${manager});`,
                    function (err, res) {
                        db.query('SELECT * FROM depot_employee', function (err, res) { console.table(res) })
                        console.table(res + "table");
                        console.log(res + "array")
                    }); prompt1()
            })
        })
    })
}

module.exports = addemployee;