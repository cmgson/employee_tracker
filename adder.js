const connection = require("./config/connection");
const mysql = require("mysql");
const inquirer = require("inquirer");
const { end } = require("./config/connection");
const { response } = require("express");

//this is to add a department to the department table
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
  //this is getting department titles in order to populate the addRole choices
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
  //this is to add a role to the role table
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
  //this is to add an employee to the employee table
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
  //this is used to get the titles of roles from roles table and populate the questions in the addEmp function
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

  module.exports = {
      addRole,
      getRole,
      addDept,
      getDept,
      addEmp,
  }