import express, { application, request, response } from'express'
import { formularioLogin, formularioRegister, formularioPasswordRecovery } from '../controllers/usersController.js';
const router=express.Router();
//Get se utiliza para lalectura de datos e informacion
//endpoints: rutas para acceder a las secciones o funciones de nuestra aplicación web
//
//: en una ruta definen de manera poscicional los parametros de entrada
    router.get("/findByID/:id",function(request, response){
    response.send(`Se esta solicitando buscar al usuario con id: ${request.params.id}`);
});
//componentes de una peticion ruta(a donde voy), funcion callback(que hago)
//Post-se utiliza para el envio de datos e info del cliente al server
router.post("/newUser/:name/:email/:password",function(req,res){
    res.send(`Se ha solicitado la creación de un nuevo usuario de nombre: ${req.params.name}, asociado al correo electronico: ${req.params.email}, con la contraseña: ${req.params.password}`)
})
//Put-Se utiliza para la actualizacion total de info del cliente al servidor
router.put("/replaceUserByEmail/:name/:email/:password", function(a,b){
    b.send(`Se ha solicirtado el reemplazo de toda la información del usuario: ${a.params.name},con correo: ${a.params.email}, y contraseña: ${a.params.password} `)
//Noo es completamente necesario usar req y res, tambien se pueden usar letras
})
//Patch-Se utiliza para la actualizacion parcial de datos
router.patch("/updatePassword/:email/:newPassword/:newPasswordConfirm",function(request,response){
    const {email,newPassword,passConfirm} = request.params 
    //Desestructuracion de un objeto
    if(newPassword==passConfirm){
    response.send(`Se ha solicitado la actualizacion de la contraseña del usuario con correo: ${email}, con la nueva conbtraseña: ${newPassword}, se aceptan los cmabios ya que la contraseña y confirmacion son la misma`)
    }else{
        response.send(`Se ha solicitado la actualizacion de la contraseña del usuario con correo: ${email}, con la nueva conbtraseña: ${newPassword}, pero se rechaza el cambio dado que la nueva contraseña y su confirmación no coinciden`)
    }
});

//Delete para eliminar 
router.delete("/deleteUser/:email",function(req,res){
    res.send(`Se ha solicitado la eliminacion del usuario asociado al correo: ${req.params.email}`)
})
// en los dos archivos de js se agrega export default router
// que es un colvat

router.get("/login", function(request,response){
  response.render('auth/login',{
   autenticado : true 
  })
})

//callbakc

router.get("/login", formularioLogin /*middleware*/)

router.get("/createAccount", formularioRegister )
router.get("/passwordRecovery", formularioPasswordRecovery )




export default router;