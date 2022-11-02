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

const viewTotalDeptSalaryPrompt = [
    {
        name: "dept",
        message: "please select a department to view total budget",
        type: "list",
        choices: []
    }
];

function viewtotaldepartmentbudget() { //function determining total salary of selected departments
    db.query(`SELECT * FROM depot`, function (err, res) {
        let deptArray = []
        for (x = 0; x < res.length; x++) {
            deptArray.push(res[x].name)
        } deptArray.push("Main Menu"); viewTotalDeptSalaryPrompt[0].choices = deptArray
        inquirer.prompt(viewTotalDeptSalaryPrompt).then(userInput => {
            const prompt1 = require("../index")
            if (userInput.dept == "Main Menu") { return prompt1(); 
            } else {//this one was quite challenging. figuring how to traverse
                db.query(`SELECT depot.name AS Department, 
                          SUM(dole.salary) AS Total_Salary,
                          COUNT(emp.id) AS number_of_employees 
                          FROM depot_employee AS emp
                          JOIN depot_role AS dole ON emp.role_id=dole.id
                          JOIN depot ON dole.depot_id=depot.id 
                          WHERE depot.name = '${userInput.dept}'
                          GROUP BY depot.name`, function (err, res) {
                    console.table(res);
                    return viewtotaldepartmentbudget();
                });
            }
        })
    })
}

module.exports = viewtotaldepartmentbudget;
