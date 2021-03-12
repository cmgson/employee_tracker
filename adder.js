const connection = require("./config/connection");
const inquirer = require("inquirer");

//this is to add a department to the department table
const addDept = () => {
  return inquirer
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
    });
};
//this is getting department titles in order to populate the addRole choices
let getDept = () => {
  return new Promise((resolve) => {
    const sql = "SELECT * FROM employee_tracker.department";
    connection.query(sql, (err, res) => {
      if (err) throw err;
      resolve(res);
    });
  });
};
//this is to add a role to the role table
const addRole = async () => {
  let choices = await getDept();
  return inquirer
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
      let obj = choices.find((o) => o.name === data.whichDept);
      const query = "INSERT INTO employee_tracker.role SET ?";
      connection.query(
        query,
        { title: data.addRole, salary: data.addSalary, department_id: obj.id },
        (err, res) => {
          if (err) throw err;
        }
      );
    });
};
//this is to add an employee to the employee table
const addEmp = async () => {
  let choicesRole = await getRole();
  newArray = [];
  for (let i = 0; i < choicesRole.length; i++) {
    newArray.push(choicesRole[i].title);
  }

  return inquirer
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
      let result = choicesRole.filter((obj) => {
        return obj.title === data.whichRole;
      });
      let obj = newArray.find((o) => o.name === data.whichRole);

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
        }
      );
    });
};
//this is used to get the titles of roles from roles table and populate the questions in the addEmp function
let getRole = () => {
  let roleArray = [];
  return new Promise((resolve) => {
    const sql = "SELECT id, title FROM employee_tracker.role";
    connection.query(sql, (err, res) => {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        roleArray.push({ id: res[i].id, title: `${res[i].title}` });
      }
      resolve(roleArray);
    });
  });
};

module.exports = {
  addRole,
  getRole,
  addDept,
  getDept,
  addEmp,
};
