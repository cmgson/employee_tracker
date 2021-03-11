const connection = require("./config/connection");
const mysql = require("mysql");
const inquirer = require("inquirer");
const { end } = require("./config/connection");
const { response } = require("express");
const adder = require('./adder.js');
const viewer = require('./viewer.js');
const updater = require('./updater.js');
const Cfonts = require("cfonts");
const chalk = require("chalk");
const log = console.log;


Cfonts.say('Employee|Tracker', {
    font: '3d',
    align: 'center',
    colors: ['magenta','cyan',],
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 2,
    space: true,
    maxLength: '0',
    gradient: false,
    independentGradient: false,
    transitionGradient: false,
    env: 'node'
  });




const init =  () => {

  
  log(chalk.magentaBright('------------------------------------\n'));
  log(chalk.cyanBright('Choose one from the list below.  If you would like to stop the program, hit quit\n'))
  log(chalk.magentaBright('------------------------------------\n'));
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
      Cfonts.say('Have a Nice Day', {
        font: 'tiny',
        align: 'center',
        colors: ['magenta','cyan',],
        background: 'transparent',
        letterSpacing: 1,
        lineHeight: 1,
        space: true,
        maxLength: '0',
        gradient: false,
        independentGradient: false,
        transitionGradient: false,
        env: 'node'
      });
      connection.end();
  }
};
connection.connect(function(err) {
  if (err) throw err;
  log(chalk.magentaBright("connected as id " + connection.threadId + "\n"));
  




  init();
});


    

