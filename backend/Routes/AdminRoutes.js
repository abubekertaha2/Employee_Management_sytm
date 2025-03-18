import bcrypt from 'bcrypt';
import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import con from "../utils/db.js";

const router = express.Router();

// Admin Login
router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin WHERE email = ? AND password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong email or password" });
    }
  });
});

// Get Categories
router.get('/category', (req, res) => {
  const sql = "SELECT * FROM category";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

// Add Category
router.post('/add_category', (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)";
  con.query(sql, [req.body.name], (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ Status: false, Error: err.message });
    }
    return res.json({ Status: true });
  });
});

// Image Upload Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Add Employee
router.post('/add_employee', upload.single('image'), (req, res) => {
  console.log("Request body:", req.body);
  console.log("Uploaded file:", req.file);

  if (!req.file) {
    return res.json({ Status: false, Error: "No file uploaded." });
  }
  const sql = `INSERT INTO employee 
  (name, email, password, address, salary, image, category_id) 
  VALUES (?)`;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.address,
      req.body.salary,
      req.file.filename,
      req.body.category_id
    ];
    con.query(sql, [values], (err, result) => {
      if (err) return res.json({ Status: false, Error: err });
      return res.json({ Status: true });
    });
  });
});

// Get All Employees
router.get('/employee', (req, res) => {
  const sql = "SELECT * FROM employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

// Get Employee by ID
router.get('/employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

// Edit Employee
router.put('/edit_employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE employee 
      SET name = ?, email = ?, salary = ?, address = ?, category_id = ? 
      WHERE id = ?`;
  const values = [
    req.body.name,
    req.body.email,
    req.body.salary,
    req.body.address,
    req.body.category_id
  ];

  console.log('Request Body:', req.body); 
  console.log('Executing SQL:', sql, [...values, id]); 

  con.query(sql, [...values, id], (err, result) => {
    if (err) {
      console.error(err); // Log the error
      return res.status(500).json({ Status: false, Error: "Query Error: " + err.message });
    }

    if (result.affectedRows === 0) {
      return res.json({ Status: false, Error: "No employee found with the given ID." });
    }

    return res.json({ Status: true, Result: result });
  });
});

// Delete Employee
router.delete('/delete_employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM employee WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get('/admin_count', (req, res) => {
  const sql = "SELECT COUNT(id) AS admin FROM admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});


router.get('/employee_count', (req, res) => {
  const sql = "SELECT COUNT(id) AS employee FROM employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get('/salary_count', (req, res) => {
  const sql = "SELECT SUM(salary) AS salaryOFEmp FROM employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});


router.get('/admin_records', (req, res) => {
  const sql = "SELECT * FROM admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.delete('/delete_admin/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM admin WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting admin:', err);
      return res.json({ Status: false, Error: "Query Error: " + err });
    }
    if (result.affectedRows > 0) {
      return res.json({ Status: true, Message: "Admin deleted successfully" });
    } else {
      return res.status(404).json({ Status: false, Error: "Admin not found" });
    }
  });
});

// Logout
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ Status: true });
});

export { router as adminRouter };

