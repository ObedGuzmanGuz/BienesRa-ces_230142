//console.log("Hola desde NodeJS, esto esta en hot reload")
//Ejemplo de activacion de HOT RELOAD


/*const express = require('express');//importar la libreria para crear un servidor web */
// instalar nuestra aplicacion web


import express from 'express';
import generalrouter from'./Routes/generalrouter.js'
import userroutes from'./Routes/userroutes.js'
const app = express()

// Configurar Template Engine -PUG
app.set('view engine', 'pug')
app.set('views', './views')

// Carpeta publica de recursos estaticos (assets)
app.use(express.static('public'));



// Configuramos nuestro servidor web
const port= 3000;


app.listen(port, ()=>{

console.log(`La aplicacion ha iniciado en el puerto: ${port}`);

});

//Ruta (Routing-enrutamiento para petuiciones)
//si se coloca otro igual, con el moismo verbo, será ignorado el siguiente
app.use('/',generalrouter)
app.use('/usuario',userroutes);



/*
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
    

*/ 























