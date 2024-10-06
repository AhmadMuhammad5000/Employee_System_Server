import conn from "../utils/db.js"

const getAdmin = (req, res, next) => {
    const sql = "SELECT * FROM admindb WHERE email = ? and password = ?";
    conn.query(sql, [req.body.email, req.body.password], (error, result) => {
        if (error) return res.json({ status: false, error: "Query Error" });
        if (result.length > 0) {
            next();
        } else {
            return res.json({ status: false, error: "Wrong Email or Password..." });
        }

    })
}



export default getAdmin
