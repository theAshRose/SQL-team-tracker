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

const addDepartmentPrompt = [
    {
        name: "name",
        message: "please enter department name",
        type: "input",
    }
];

function adddepartment() {//simple insert into query attatched to prompt
    inquirer.prompt(addDepartmentPrompt).then(userInput => {
        const prompt1 = require('../index');
        db.query(`INSERT INTO depot (name) VALUES ('${userInput.name}')`, function (err, res) {
            console.log(`'${userInput.name}' has been added to the department database!`)
            prompt1()
        })
    })
}

module.exports = adddepartment;