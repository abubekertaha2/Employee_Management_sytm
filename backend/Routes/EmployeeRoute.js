import bcrypt from 'bcrypt';
import express from 'express';
import jwt from "jsonwebtoken";
import con from "../utils/db.js";

const router = express.Router()

router.post("/employee_login", (req, res) => {
  const sql = "SELECT * FROM employee WHERE email = ?";
  con.query(sql, [req.body.email], (err, result) => {
      if (err) {
          console.error("Query error:", err);
          return res.json({ loginStatus: false, Error: "Query error" });
      }
      if (result.length > 0) {
          bcrypt.compare(req.body.password, result[0].password, (err, response) => {
              if (err) {
                  console.error("Password comparison error:", err);
                  return res.json({ loginStatus: false, Error: "Password comparison error" });
              }
              if (response) {
                  const token = jwt.sign(
                      { role: "employee", email: result[0].email, id: result[0].id },
                      "jwt_secret_key",
                      { expiresIn: "1d" }
                  );
                  res.cookie('token', token);
                  return res.json({ loginStatus: true, id: result[0].id });
              } else {
                  return res.json({ loginStatus: false, Error: "Wrong password" });
              }
          });
      } else {
          return res.json({ loginStatus: false, Error: "Wrong email or password" });
      }
  });
});
router.get('/detail/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  con.query(sql, [id], (err, result) => {
      if (err) {
          console.error("Query error:", err);
          return res.json({ Status: false, Error: "Query error" });
      }
      if (result.length > 0) {
          return res.json({ Status: true, data: result[0] });
      } else {
          return res.json({ Status: false, Error: "Employee not found" });
      }
  });
});

  router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
  })

  export { router as EmployeeRouter };

