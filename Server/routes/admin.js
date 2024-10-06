import express from "express"
import jwt from 'jsonwebtoken'
import conn from '../utils/db.js'
import authAdmin from '../middlewares/adminAuth.js'
import getAdmin from "../model/adminModel.js"
import env from 'dotenv/config'

const router = express.Router();

// ADMIN LOGIN
router.post("/adminLogin", getAdmin, (req, res) => {
    const email = req.body.email;
    const token = jwt.sign(
        { role: "admin", email: email },
        process.env.SECRETE_KEY,
        { expiresIn: "1d" }
    );
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: (60 * 60 * 24) });
    return res.json({ status: true, data: `Login Successfull..` });
})

// add employee
router.post("/add_employees", authAdmin, (req, res) => {
    const values = [
        req.body.fullname,
        req.body.email,
        req.body.address,
        req.body.category,
        req.body.account,
        req.body.salary
    ];
    const sql = "INSERT INTO employees(fullname,email,address,category,account,salary) VALUES(?,?,?,?,?,?)";
    conn.query(sql, values, (error, result) => {
        if (error) return res.json({ status: false, error: 'Failed To Save Employee..' });
        return res.json({ status: true, data: 'Saved Successfully !' });
    })

})

// fetch employees
router.get("/employees", authAdmin, (req, res) => {

    const sql = "SELECT * FROM employees";
    conn.query(sql, (error, result) => {
        if (error) return res.json({ status: false, error: 'Query Error' });

        if (result.length > 0) {
            return res.json({ status: true, data: result });
        } else {
            return res.json({ status: false, error: 'No Employee foumd !' });
        }
    })
})

// getting employee by id
router.get("/employeeById/:id", authAdmin, (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employees WHERE id=?";
    conn.query(sql, [id], (error, result) => {
        if (error) return res.json({ status: false, error: 'Query Error' });
        if (result.length > 0) {
            return res.json({ status: true, data: result });
        } else {
            return res.json({ status: false, error: 'No user found !' });
        }
    })
})

// updating employee
router.put("/editEmployee/:id", (req, res) => {
    const id = req.params.id;
    const values = [
        req.body.fullname,
        req.body.email,
        req.body.address,
        req.body.category,
        req.body.account,
        req.body.salary,
        id
    ];

    const sql = "UPDATE employees set fullname=?, email=?, address=?, category=?, account=?, salary=? WHERE id=?";
    conn.query(sql, values, (error, result) => {
        if (error) return res.json({ status: false, error: 'Query Error' });
        return res.json({ status: true });
    })
});

// deleting employee by id
router.delete("/deleteEmployee/:id", authAdmin, (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM employees WHERE id=?";
    conn.query(sql, [id], (error, result) => {
        if (error) return res.json({ status: false, error: "QUERY ERROR" });
        return res.json({ status: true });
    })
})

// add category
router.post("/add_category", authAdmin, (req, res) => {
    const sql = "INSERT INTO category(name) VALUES(?)";
    conn.query(sql, [req.body.category], (error, result) => {
        if (error) return res.json({ status: false, error: 'Failed To Save Category..' });
        return res.json({ status: true, data: 'Saved Successfully !' });
    })
})

// fetch category
router.get("/categories", authAdmin, (req, res) => {
    const sql = "SELECT * FROM category";
    conn.query(sql, (error, result) => {
        if (error) return res.json({ status: false, error: 'Query Error' });
        if (result.length > 0) {
            return res.json({ status: true, data: result });
        } else {
            return res.json({ status: false, error: 'No category found !' });
        }
    })
})

// fetch category by id
router.get("/category/:id", authAdmin, (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM category WHERE id = ?";
    conn.query(sql, id, (error, result) => {
        if (error) return res.json({ status: false, error: 'Query Error' });
        if (result.length > 0) {
            return res.json({ status: true, data: result });
        } else {
            return res.json({ status: false, error: 'No category found !' });
        }
    })
})

// EDIT CATEGORY
router.put("/editCategory/:id", authAdmin, (req, res) => {
    const id = req.params.id;

    const sql = "UPDATE category set name=? WHERE id=?";
    conn.query(sql, [req.body.category, id], (err, result) => {
        if (err) return res.json({ status: false, error: 'Query Error !' });
        return res.json({ status: true });
    });
})

// deleting category
router.delete("/deleteCategory/:id", authAdmin, (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM category WHERE id = ?";
    conn.query(sql, [id], (err, result) => {
        if (err) return res.json({ status: false });
        return res.json({ status: true });
    });
})

// fetch admin
router.get("/get_admin", authAdmin, (req, res) => {
    const sql = "SELECT * FROM admindb WHERE id=?";
    conn.query(sql, 2, (error, result) => {
        if (error) return res.json({ status: false, error: 'Query Error' });
        if (result.length > 0) {
            return res.json({ status: true, data: result });
        } else {
            return res.json({ status: false, error: 'No user found !' });
        }
    })
})

// getting admin total
router.get("/admin_total", authAdmin, (req, res) => {
    const sql = "SELECT count(id) as adminId FROM admindb";
    conn.query(sql, (error, result) => {
        if (error) return res.json({ status: false, error: 'Query Error' });
        return res.json({ status: true, data: result });
    })
})
// getting employees total
router.get("/employee_total", authAdmin, (req, res) => {
    const sql = "SELECT count(id) as totalEmp FROM employees";
    conn.query(sql, (error, result) => {
        if (error) return res.json({ status: false, error: 'Query Error' });
        return res.json({ status: true, data: result });
    })
})
// getting sallary total
router.get("/salary_total", authAdmin, (req, res) => {
    const sql = "SELECT sum(salary) as salaryOfEmp FROM employees";
    conn.query(sql, (error, result) => {
        if (error) return res.json({ status: false, error: 'Query Error' });
        return res.json({ status: true, data: result });
    })
})

// update profile
router.put("/update", authAdmin, (req, res) => {
    const sql = "UPDATE admindb set fullname=?, email=?, password=? WHERE id=?";
    conn.query(sql, [req.body.fullname, req.body.email, req.body.password, req.body.id], (error, result) => {
        if (error) return res.json({ status: false, error: 'Failed To Update Profile..' });
        return res.json({ status: true, data: 'Updated Successfully !' });
    })
})

// ADMIN LOGOUT
router.get("/logout", (req, res) => {
    res.clearCookie('token');
    return res.json({ status: true });
});


export { router as adminRouter }
