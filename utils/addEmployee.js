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
    choices: []
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
    ]
},
];

function addemployee() {
    const prompt1 = require("../index")
    db.query("SELECT title AS role FROM depot_role;", function (err, res) {
        let namesArr = [];
        for (x = 0; x < res.length; x++) {
            namesArr.push(res[x].role)
        } addEmployeePrompt[0].choices = namesArr
        db.query("SELECT CONCAT(first_name, ' ', last_name) AS managers FROM depot_employee WHERE manager_id IS NULL", function (err, res) {
            let namesArr = [];
            for (x = 0; x < res.length; x++) {
                namesArr.push(res[x].managers)
            } namesArr.push("NONE"); addEmployeePrompt[3].choices = namesArr
            inquirer.prompt(addEmployeePrompt).then(userInput => {
                console.log(`${userInput.first_name} ${userInput.last_name} has been added to the database!`)
                db.query(`SELECT * FROM depot_role WHERE title='${userInput.role}'`, function (err, res) {
                    let role = res[0].id
                    db.query(`SELECT * FROM depot_employee WHERE CONCAT(first_name, ' ', last_name)='${userInput.manager}'`, function (err, res) {
                        let newInput = userInput
                        if (userInput.manager === "NONE") {
                            let manager = null
                            db.query(`INSERT INTO depot_employee (first_name, last_name, role_id, manager_id) VALUES ('${userInput.first_name}', '${userInput.last_name}', ${role}, ${manager})`,
                                function (err, res) {
                                }); prompt1()
                        } else {
                            let manager = res[0].id
                            db.query(`INSERT INTO depot_employee (first_name, last_name, role_id, manager_id) VALUES ('${userInput.first_name}', '${userInput.last_name}', ${role}, ${manager})`,
                                function (err, res) {
                                }); prompt1()
                        }
                    })
                })
            })
        })
    })
}
// if (userInput.manager === "NONE") { let manager = null } else { let manager = res[0].id }
module.exports = addemployee;