const connection = require("./config/connection");

const viewDept = () => {
  return new Promise((resolve) => {
    const sql = "SELECT * FROM employee_tracker.department";
    connection.query(sql, (err, res) => {
      if (err) throw err;
      resolve(console.table(res));
    });
  });
};

const viewRoles = () => {
  return new Promise((resolve) => {
    const sql = "SELECT * FROM employee_tracker.role";
    connection.query(sql, (err, res) => {
      if (err) throw err;
      resolve(console.table(res));
    });
  });
};

const viewEmp = () => {
  return new Promise((resolve) => {
    const sql = "SELECT * FROM employee_tracker.employee";
    connection.query(sql, (err, res) => {
      if (err) throw err;
      resolve(console.table(res));
    });
  });
};

module.exports = {
  viewDept,
  viewRoles,
  viewEmp,
};
