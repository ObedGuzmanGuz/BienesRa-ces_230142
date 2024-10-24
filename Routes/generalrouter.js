import express from'express'
const router= express.Router()
//Ruta (Routing-enrutamiento para petuiciones)
router.get("/", function(req,res){
    res.send("Hola desde la web, en Nodejs")
})
router.get("/quieneres", function(req,res){
    res.json(
        {
            "nombre":"Obed Guzman Flores",
            "Carrera": "Desarrollo de Software Multiplataforma",
            "Grado":"4",
            "Grupo":"A"
        }
    )
})
// reservada de js que  permite exportar los elementos
export default router; 