import Router from "express"
import connection from "../database/db.js"
// import crud from "../controller/crud.js"
import multer from "multer"
import {v4 as uuidv4}from "uuid"
import { dirname, join, extname } from "path"
import { fileURLToPath } from "url"
import fs from "fs"

const __dirname = dirname(fileURLToPath(import.meta.url))

const storage = multer.diskStorage({
    destination: join(__dirname, '../public/uploads'),
    filename: (req, file, cb) => {
        cb(null, uuidv4() + extname(file.originalname).toLocaleLowerCase());
    }
})

const uploadImage = multer({
    storage,
    fileFilter: (req, file, cb) => {

        const _filetypes = /jpeg|jpg|png|gif/;
        const _mimetype = _filetypes.test(file.mimetype);
        const _extname = _filetypes.test(extname(file.originalname).toLowerCase());
        if (_mimetype && _extname) {
            return cb(null, true);
        }
        console.log("Archivo No Compatible" + _filetypes);
    }//,
    //limits: { fileSize: 1000000 }
}).single('file');

const router = Router()

router.get("/", (req, res) => res.render("index"))

router.get("/mostrar", async (req, res) => {
    await connection.query("SELECT * FROM radiografias", (error, results) => {
        if (error) {
            console.error("No se ha realizado la query " + error)
            return
        }
        res.render("read", { results: results })

    })
})

router.get("/crear", (req, res) => res.render("create"))

router.get("/actualizar/:id", async (req, res) => {
    const id = req.params.id
    await connection.query("SELECT * FROM radiografias WHERE id=?", [id], (error, results) => {
        if (error) {
            console.error("No se ha realizado la query " + error)
            return
        }
        res.render("update", { user: results[0] })
    })
})

router.post("/guardar", uploadImage, async (req, res) => {
    const file = req.file.filename
    const nombreApellido = req.body.nombre_apellido
    const nacimiento = req.body.nacimiento
    const cedula = req.body.cedula
    const tipo = req.body.tipo
    const expedicion = req.body.expedicion
    await connection.query("INSERT INTO radiografias set ?", {
        nombre_apellido: nombreApellido,
        nacimiento: nacimiento,
        cedula: cedula,
        tipo: tipo,
        expedicion: expedicion,
        ruta: file
    }, (error, results) => {
        if (error) {
            console.error("No se ha realizado la query " + error)
        } else {
            res.redirect("/mostrar")
        }
    })
})

router.post("/editar", async (req, res) => {
    const id = req.body.id
    const nombreApellido = req.body.nombre_apellido
    const nacimiento = req.body.nacimiento
    const cedula = req.body.cedula
    const tipo = req.body.tipo
    const expedicion = req.body.expedicion
    await connection.query("UPDATE radiografias SET ? WHERE id = ?", [{
        nombre_apellido: nombreApellido,
        nacimiento: nacimiento,
        cedula: cedula,
        tipo: tipo,
        expedicion: expedicion
    }, id], (error, results) => {
        if (error) {
            console.error("No se ha realizado la query " + error)
        } else {
            res.redirect("/mostrar")
        }

    })
})

router.get("/eliminar/:id", async (req, res) => {
    const id = req.params.id
    await connection.query("SELECT ruta FROM radiografias WHERE id=?", [id], (error, results) => {
        if (error) {
            console.error("No se ha realizado la query " + error)
        } else {
            try {
                fs.unlinkSync(join(__dirname, "../public/uploads/", results[0].ruta))
                await connection.query("DELETE FROM radiografias WHERE id = ?", [id], (error, results) => {
                    if (error) {
                        console.error("No se ha realizado la query " + error)
                    } else {
                        res.redirect("/mostrar")
                    }
                })
            } catch(error) {
                console.error('No ha sido removido el archivo', error)
            }
        }
    })
})

export default router