const connection = require("./config/connection");
const mysql = require("mysql");
const inquirer = require("inquirer");

const init = () => {
  inquirer
    .prompt([
      {
        name: "init",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Add Department",
          "Add a Role",
          "Add an Employee",
          "View Departments",
          "View Roles",
          "View Employees",
          "Update Employee Role",
          "Update Employee Manager",
          "View employees by Manager",
          "Delete Department",
          "Delete Role",
          "Delete Employee",
          "View Budget Allocation by Department",
        ],
      },
    ])
    .then((data) => {
      console.log(data);
      if (data.init === "Add Department") {
        inquirer
          .prompt([
            {
              name: "addDept",
              type: "input",
              message: "what is the department you would like to add?",
            },
          ])
          .then((data) => {
              const query = "INSERT INTO department SET ?";
            connection.query(query, { name : data.addDept}),
              function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + "inserted!\n");
              };
          });
      }
    });
};
init();
