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

const updateRolePrompt = [{
    name: "employee",
    message: "Select an employee",
    type: "list",
    choices: []
}, {
    name: "role",
    message: "Select a role for this employee",
    type: "list",
    choices: []
}]

function updateemployeerole() {
    db.query("SELECT CONCAT(first_name, ' ', last_name) AS fullname FROM depot_employee", function (err, res) {
        let namesArr = [];
        for (x = 0; x < res.length; x++) {
            namesArr.push(res[x].fullname)
        } updateRolePrompt[0].choices = namesArr
        db.query("SELECT title AS roles FROM depot_role", function (err, res) {
            let rolesArr = [];
            for (x = 0; x < res.length; x++) {
                rolesArr.push(res[x].roles)
            } updateRolePrompt[1].choices = rolesArr
            inquirer.prompt(updateRolePrompt).then(userInput => {
                const prompt1 = require("../index")
                console.log(userInput)// result { employee: 'Bill Lumbergh', role: 'Garden Manager' }
                let splitter = userInput.employee
                let theSplitted = splitter.split(' ')
                let sliceNsplit = theSplitted.slice(-1)
                db.query(`SELECT id FROM depot_role WHERE title='${userInput.role}'`, function (err, res) {
                    let roleID = res[0].id
                    db.query(`UPDATE depot_employee SET role_id=${roleID} WHERE last_name='${sliceNsplit}'`, function (err, res) {
                        console.log("Updated role! " + userInput.employee + " is now a " + userInput.role)
                        db.query(`SELECT * FROM depot_employee WHERE last_name='${sliceNsplit}'`, function (err, res) {                            
                                if (res[0].role_id === 1) {
                                    db.query(`UPDATE depot_employee SET manager_id=NULL WHERE last_name='${sliceNsplit}'`, function (err, res) {
                                    }) 
                                }                            
                        }); prompt1()
                    })
                })
            })
        })
    })
}

module.exports = updateemployeerole;