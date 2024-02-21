import express from 'express'
import cors from 'cors';
import pg from "pg"
import dotenv from 'dotenv'
import handler from 'express-async-handler'

dotenv.config();

const Pool = pg.Pool;

// const pool = new Pool({
//      port: process.env.PG_PORT,
//     host: process.env.PG_HOST,
//     database: process.env.PG_DATABASE,
//     password: process.env.PG_PASSWORD,
//     user: process.env.PG_USER,
// })

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

const createConnection = async() => {
    let connection
    try {
        connection = await pool.connect();
        console.log("DB connected")
    } catch (error) {
        console.log("DB ERROR" + error.message);
    } finally {
        connection.release();
    }
}

createConnection();



const app = express();
const PORT = 8000;



app.use(express.json());



app.use(cors(
    {
      option:['http://localhost:5173']
    }
))

app.post('/post', handler(async (req,res) => {
    const { name, id, designation, salary, department, dob, gender } = req.body
    

    const result = await pool.query('INSERT INTO employees(id,name,salary,designation,dob,gender,department) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *', [id, name, salary, designation, dob, gender, department])
    
    return res.status(201).json(result.rows[0]);
}))

app.get('/get', handler(async (req, res) => {
    const result = await pool.query('SELECT * from employees');

    return res.status(200).json(
        result.rows
    )
} ))

app.listen(PORT, () => {
    console.log('server listening on port ' + PORT);
})