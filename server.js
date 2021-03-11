const connection = require("./config/connection");
const mysql = require("mysql");
const inquirer = require("inquirer");
const { end } = require("./config/connection");
const { response } = require("express");
const adder = require('./adder.js')
const viewer = require('./viewer.js')
const updater = require('./updater.js')

const init =  () => {
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
          "Quit",
        ],
      },
    ])
    .then((data) => {
      questionSwitch(data);
    });
};

const questionSwitch = async (data) => {
  switch (data.init) {
    case "Add Department":
      await adder.addDept();
      init();
      break;
    case "Add a Role":
      await adder.addRole();
      init();
      break;
    case "Add an Employee":
      await adder.addEmp();
      init();
      break;
    case "View Departments":
      await viewer.viewDept();
      init();
      break;
    case "View Roles":
      await viewer.viewRoles();
      init()
      break;
    case "View Employees":
      await viewer.viewEmp();
      init();
      break;
    case "Update Employee Role":
      await updater.upRole();
      init();
      break;
    case "Quit":
      console.log('have a nice day!');
      connection.end();
  }
};
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  init();
});

