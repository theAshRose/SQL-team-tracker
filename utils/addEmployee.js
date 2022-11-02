const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require("inquirer");


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'HatsuneMiku',
        database: 'depot_db'
    },
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
//i went with nested db.queries as promisifying felt too tenuous 
function addemployee() {
    const prompt1 = require("../index") //if we do not import our prompt1 function in here we have to way of calling it down the line
    db.query("SELECT title AS role FROM depot_role;", function (err, res) {
        let namesArr = [];
        for (x = 0; x < res.length; x++) {
            namesArr.push(res[x].role)
        } addEmployeePrompt[0].choices = namesArr
        db.query("SELECT CONCAT(first_name, ' ', last_name) AS managers FROM depot_employee WHERE manager_id IS NULL", function (err, res) {
            let namesArr = [];
            for (x = 0; x < res.length; x++) { //two for loops are needed to pull values from mySQL db and push them into our prompt array
                namesArr.push(res[x].managers)
            } namesArr.push("NONE"); addEmployeePrompt[3].choices = namesArr
            inquirer.prompt(addEmployeePrompt).then(userInput => {
                console.log(`${userInput.first_name} ${userInput.last_name} has been added to the database!`)
                db.query(`SELECT * FROM depot_role WHERE title='${userInput.role}'`, function (err, res) {
                    let role = res[0].id
                    db.query(`SELECT * FROM depot_employee WHERE CONCAT(first_name, ' ', last_name)='${userInput.manager}'`, function (err, res) {
                        if (userInput.manager === "NONE") { ///if statements in case the new employee is a manager certain steps must be taken
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
module.exports = addemployee;