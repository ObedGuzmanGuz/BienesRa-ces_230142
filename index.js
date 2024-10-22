//console.log("Hola desde NodeJS, esto esta en hot reload")
//Ejemplo de activacion de HOT RELOAD


/*const express = require('express');//importar la libreria para crear un servidor web */
// instalar nuestra aplicacion web


import express from 'express';
const app = express()

const port= 3000;


app.listen(port, ()=>{

console.log(`La aplicacion ha iniciado en el puerto: ${port}`);

});

//Routing - Enrutamiento para peticiones

app.get("/", function(req,res){
res.send("Hola de el web, en NodeJS")

})


app.get("/quienEres", function(req,res){
    res.json(
{
    "Nombre": "Obed Guzman ",
    "carrera": "TI DSM",
    "grado": "4",
    "grupo": "A"
}


    )
    
    })
    

// 























