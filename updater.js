const connection = require("./config/connection");
const mysql = require("mysql");
const inquirer = require("inquirer");
const { end } = require("./config/connection");
const { response } = require("express");
const { getRole } = require("./adder");

const upRole = async () => {
  let empArray = await getEmp();
  let choicesRole = await getRole();
  newArray = [];
  newEmpArray = [];
  for (let i = 0; i < choicesRole.length; i++) {
    newArray.push({ name: choicesRole[i].title, value: choicesRole[i].id });
  }

  for (let i = 0; i < empArray.length; i++) {
    newEmpArray.push({
      name: empArray[i].first_name + " " + empArray[i].last_name,
      value: empArray[i].id,
    });
  }


  return inquirer
    .prompt([
      {
        name: "whichEmp",
        type: "list",
        message: "which employee's role would you like to change?",
        choices: newEmpArray,
      },
      {
        name: "whichRole",
        type: "list",
        message: "which role would you like to switch them to?",
        choices: newArray,
      },
    ])
    .then((data) => {

      return new Promise((resolve) => {
        const sql =
        "UPDATE employee_tracker.employee SET role_id = ? WHERE id = ?";
      connection.query(sql, [data.whichRole, data.whichEmp], (err, res) => {
        if (err) throw err;
        resolve(res.affectedRows);
      });
      });
      
    });
};

const getEmp = () => {
  empArray = [];
  return new Promise((resolve) => {
    const sql =
      "SELECT first_name, last_name, id FROM employee_tracker.employee";
    connection.query(sql, (err, res) => {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        empArray.push({
          first_name: res[i].first_name,
          last_name: res[i].last_name,
          id: res[i].id,
        });
      }
      resolve(empArray);
    });
  });
};

module.exports = {
  upRole,
};
