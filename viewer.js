const connection = require("./config/connection");
const mysql = require("mysql");
const inquirer = require("inquirer");
const { end } = require("./config/connection");
const { response } = require("express");

const viewDept = () => {
  return new Promise(() => {
    const sql = "SELECT * FROM employee_tracker.department";
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res) 
    });
  });
};

const viewRoles = () => {
    return new Promise(() => {
        const sql = "SELECT * FROM employee_tracker.role";
        connection.query(sql, (err, res) => {
            if (err) throw err;
            console.table(res) 
        });
      });

}

const viewEmp = () => {
    return new Promise(() => {
        const sql = "SELECT * FROM employee_tracker.employee";
        connection.query(sql, (err, res) => {
            if (err) throw err;
            console.table(res) 
        });
      });

}



module.exports = {
  viewDept,
  viewRoles,
  viewEmp,
};
