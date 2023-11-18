import express from "express"
import {dirname, join} from "path"
import {fileURLToPath} from "url"
import routes from "./routes/routes.js"
import {PORT} from "./config.js"

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

app.set("viewes", join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.urlencoded({extended: false}))
app.use(express(JSON))
app.use(routes)
app.use(express.static(join(__dirname, "public")))

app.listen(PORT, () => {
    console.log(`Servidor Corriendo En La Ruta http://localhost:${PORT}`)
})