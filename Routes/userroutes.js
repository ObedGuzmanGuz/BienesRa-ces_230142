import express, { application, request, response } from'express'
import { formularioLogin, useratentication,formularioRegister,registrar, confirmar,formularioPasswordRecovery,passwordReset,verifyTokenPasswordChange,updatePassword} from '../controllers/usersController.js';
const router=express.Router();
//Get se utiliza para lalectura de datos e informacion
//endpoints: rutas para acceder a las secciones o funciones de nuestra aplicación web
//POST- Se utiliaza para el envio de datros e informacion del cliente al servidor




//callbakc

router.get("/login", formularioLogin /*middleware*/)

router.post("/login", useratentication);

router.get("/createAccount", formularioRegister )
router.post("/createAccount", registrar )

//router.post("/createAccount",(req,res,next)=>{ console.log("Enviando informacion para la creacion"), next();}, )
 
router.get("/confirmar/:token", confirmar)


router.get("/passwordRecovery", formularioPasswordRecovery )

router.post("/passwordRecovery", passwordReset);


//Actualizar contraseña 
router.get("/passwordRecovery/:token", verifyTokenPasswordChange) //verica que exista el correo
router.post("/passwordRecovery/:token", updatePassword) //Actualizar en la base de datos



export default router;