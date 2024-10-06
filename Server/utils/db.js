import mysql from 'mysql';
import env from 'dotenv/config'

const conn = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

conn.connect((err,res) =>{
    if(err) console.log("Error While Connecting Database");
    if(res) console.log("Connected Successfully...");
})

export default conn