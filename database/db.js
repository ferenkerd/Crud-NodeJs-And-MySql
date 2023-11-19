import mysql from "mysql2/promise"
import {DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME} from "../config.js"

const connection = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_NAME
})


connection.getConnection((error, conn) => {
    if(error) {
        console.error("error en la conexion "+error)
        return 
    }
    console.log("conectado a la base de datos mysql")
    conn.release()
})

async function testConnection() {
    try {
        const conn = await connection.getConnection()
        console.log("conectado a la base de datos mysql")
        conn.release()
    }catch (error) {
        console.error("error en la conexion "+error)
    }
}

testConnection()

export default connection