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
    console.log(`Accessing depot_db...`)
);

const addRolePrompt = [
    {
        name: "title",
        message: "Please enter new role title: ",
        type: "input",
    }, {
        name: "salary",
        message: "Please enter the salary of this role: ",
        type: "input",
    }, {
        name: "name",
        message: "Please select the department which this role belongs to: ",
        type: "list",
        choices: [

        ]
    },
]

function addrole() {
    db.query('SELECT depot.name FROM depot', function (err, res) {
        let deptArray = []
        for (x = 0; x < res.length; x++) {
            deptArray.push(res[x].name)
        } addRolePrompt[2].choices = deptArray
        inquirer.prompt(addRolePrompt).then(userInput => {
            const prompt1 = require('../index');
            db.query(`SELECT * FROM depot WHERE name='${userInput.name}'`, function (err, res) {
                let depotID = res[0].id
                db.query(`INSERT INTO depot_role (title, salary, depot_id) VALUES ('${userInput.title}', '${userInput.salary}', '${depotID}')`, function (err, res) {
                    console.log(`'${userInput.title}' has been added to roles in the database!`)
                    prompt1()
                })
            })
        })
    })
}

module.exports = addrole;
