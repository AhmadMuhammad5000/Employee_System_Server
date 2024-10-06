import jwt from 'jsonwebtoken'
import env from 'dotenv/config'

// Authorizing Admin
const authAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.json({ status: false, error: "UnAuthorized" });
    } else {
        //  verifying the admin
        jwt.verify(token, process.env.SECRETE_KEY, (err, decoded) => {
            if (err) res.json({ status: false, error: "UnAuthorized" });
            const { role } = decoded;

            if (role === 'admin') {
                next();
            } else {
                res.json({ status: false, error: "You are not admin" });
            }
        })

    }

}

export default authAdmin