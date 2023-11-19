import mysql from "mysql"
import {DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME} from "../config.js"

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_NAME
})

connection.connect((error) => {
    if(error) {
        console.error("error en la conexion "+error)
        return
    }
    console.log("conectado a la base de datos mysql")
})

export default connection