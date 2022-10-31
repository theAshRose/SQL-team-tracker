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
    name: "role_id",
    message: "enter employee role",
    type: "input"
}, {
    name: "first_name",
    message: "enter employee first name",
    type: "input"
}, {
    name: "last_name",
    message: "enter employee last name",
    type: "input"
}, {
    name: "manager_id",
    message: "enter employee's manager(if any)'",
    type: "input"
},
];


function addemployee() {
    const prompt1 = require("../index")
    let finalInput = [];
    inquirer.prompt(addEmployeePrompt).then(userInput => {
        finalInput.push(userInput)
        let roleID = finalInput.role_id; console.log(roleID+"DEFINED")
        db.query('SELECT role_id FROM depot_role WHERE title = ?', roleID, function (err, res) {
            console.table(res+"table1");
            console.log(roleID+"roleID")
            let managerID = finalInput.manager_id; console.log(managerID)
            db.query('SELECT manager_id FROM depot_role WHERE title = ?', managerID, function (err, res) {
                console.table(res+"table2");
                console.log(roleID+"managerID")
                db.query('INSERT INTO depot_employee (first_name, last_name, role_id, manager_id) VALUES ('
                    +finalInput.first_name+', '+finalInput.last_name+', '+roleID+', '+ managerID +');',
                    function (err, res) {
                        db.query('SELECT * FROM depot_employee', function(err, res){console.table(res)})
                        console.table(res+"table");
                        console.log(res+"array")
                        prompt1()
                    });
            })
        })
    })
} 

module.exports = addemployee;