const connection = require("./config/connection");
const mysql = require("mysql");
const inquirer = require("inquirer");
const { end } = require("./config/connection");
const { response } = require("express");
const { getRole } = require("./adder");

const upRole = async () => {
    let empArray = await getEmp();
    let choicesRole = await getRole();
    console.log('choices role was passed into upRole');
    console.log(choicesRole);
    newArray = [];
    newEmpArray = []
    for (let i = 0; i < choicesRole.length; i++) {
        console.log(choicesRole[i].title);
        newArray.push(choicesRole[i].title);
      }
      console.log(newArray);

    
    inquirer.prompt([
        {
            name: "whichEmp",
            type: 'list',
            message: "which employee's role would you like to change?",
            choices: empArray
            
        },
        {
            name: "whichRole",
            type: 'list',
            message: "which role would you like to switch them to?",
            choices: choicesRole
        },
    ])
    .then((data) => {
        console.log(data);
    })
    



};

const getEmp = () => {
    empArray = [];
    return new Promise((resolve) => {
        const sql = "SELECT first_name, last_name FROM employee_tracker.employee";
        connection.query(sql, (err, res) => {

            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                empArray.push({ first_name: res[i].first_name, last_name : res[i].last_name});
            }
            console.log(empArray);
            resolve(empArray);
        })
    })
}

module.exports = {
    upRole,
}