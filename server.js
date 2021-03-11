const connection = require("./config/connection");
const mysql = require("mysql");
const inquirer = require("inquirer");
const { end } = require("./config/connection");
const { response } = require("express");
const adder = require('./adder.js')
const viewer = require('./viewer.js')
const updater = require('./updater.js')

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
      questionSwitch(data);
    });
};

const questionSwitch = (data) => {
  console.log('did we make it?');
  switch (data.init) {
    case "Add Department":
      adder.addDept();
      break;
    case "Add a Role":
      adder.addRole();
      break;
    case "Add an Employee":
      adder.addEmp();
      break;
    case "View Departments":
      viewer.viewDept();
      break;
    case "View Roles":
      viewer.viewRoles();
      break;
    case "View Employees":
      viewer.viewEmp();
      break;
    case "Update Employee Role":
      updater.upRole();
      break;
    case "Update Employee Manager":
      upMan();
      break;
    case "View employees by Manager":
      viewMan();
      break;
    case "Delete Department":
      delDept();
      break;
    case "Delete Role":
      delRole();
      break;
    case "Delete Employee":
      delEmp();
      break;
    case "View Budget Allocation by Department":
      budget();
      break;
  }
};

init();
