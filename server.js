const connection = require("./config/connection");
const mysql = require("mysql");
const inquirer = require("inquirer");
const { end } = require("./config/connection");
const { response } = require("express");

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
  switch (data.init) {
    case "Add Department":
      addDept();
      break;
    case "Add a Role":
      addRole();
      break;
    case "Add an Employee":
      addEmp();
      break;
    case "View Departments":
      viewDept();
      break;
    case "View Roles":
      viewRoles();
      break;
    case "View Employees":
      viewEmp();
      break;
    case "Update Employee Role":
      upRole();
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

const addDept = () => {
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
      connection.query(query, { name: data.addDept });
      console.log("hey were done");
      // connection.end();
    });
};
let getDept = () => {
  return new Promise((resolve) => {
    const sql = "SELECT * FROM employee_tracker.department";
    connection.query(sql, (err, res) => {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].id);
      }
      resolve(res);
    });
  });
};

const addRole = async () => {
  let choices = await getDept();
  inquirer
    .prompt([
      {
        name: "addRole",
        type: "input",
        message: "what is the role you would like to add?",
      },
      {
        name: "addSalary",
        type: "number",
        message: "what is the salary for this role?",
      },
      {
        name: "whichDept",
        type: "list",
        choices: choices,
      },
    ])
    .then((data) => {
      console.log(data);
      console.log(choices);
      let obj = choices.find((o) => o.name === data.whichDept);
      console.log(obj);
      const query = "INSERT INTO employee_tracker.role SET ?";
      connection.query(
        query,
        { title: data.addRole, salary: data.addSalary, department_id: obj.id },
        (err, res) => {
          if (err) throw err;
          console.log(res.affectedRows);
        }
      );
      console.log("did it");
    });
};

const addEmp = async () => {
  let choicesRole = await getRole();
  console.log("choices role was passed into addemp");
  console.log(choicesRole);
  newArray = [];
  for (let i = 0; i < choicesRole.length; i++) {
    console.log(choicesRole[i].title);
    newArray.push(choicesRole[i].title);
  }
  console.log(newArray);

  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "what is the first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the last name?",
      },
      {
        name: "whichRole",
        type: "list",
        message: "What role would you like to assign?",
        choices: newArray,
      },
    ])
    .then((data) => {
      console.log(data);
      console.log(choicesRole);
      let result = choicesRole.filter((obj) => {
        return obj.title === data.whichRole;
      });
      console.log(result);
      // data.whichRole = result.id
      console.log("here comes the magic hopefully");
      console.log(`does this work${data.whichRole}`);

      let obj = newArray.find((o) => o.name === data.whichRole);
      console.log(`this should be the id${result[0].id}`);
      const query = "INSERT INTO employee_tracker.employee SET ?";
      connection.query(
        query,
        {
          first_name: data.firstName,
          last_name: data.lastName,
          role_id: result[0].id,
        },
        (err, res) => {
          if (err) throw err;
          console.log(res.affectedRows);
        }
      );
      console.log("did it");
    });
};
let getRole = () => {
  let roleArray = [];
  return new Promise((resolve) => {
    const sql = "SELECT id, title FROM employee_tracker.role";
    connection.query(sql, (err, res) => {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        // console.log(res[i].title);

        roleArray.push({ id: res[i].id, title: `${res[i].title}` });
      }
      console.log(roleArray);
      console.log(res);
      resolve(roleArray);
    });
  });
};
init();
