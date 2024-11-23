 import { check, validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js'
import { generatetId } from '../helpers/tokens.js';
import {emailRegistro} from '../helpers/emails.js' 
import { response } from 'express';
import csurf from 'csurf';
const formularioLogin =(request,response) => {
    response.render('auth/login',{
      page: 'iniciar Sesion'
    })
  };


  const formularioRegister =(request,response) => {
   
    response.render('auth/register',{
      page: "Crear cuenta...",
      csrfToke: request.csrfToken()

    })
  };

const registrar = async (req,res) =>{
    //Validacion
  
  await check('nombre').notEmpty().withMessage('El nombre no puede ir vacio,campo obligatorio').run(req) 



  await check('email').notEmpty().withMessage('No es un Email').isEmail().withMessage('Correo campo obligatorio').run(req) 
  await check('birthdate').notEmpty() .withMessage('La fecha de nacimiento es obligatoria').isDate() .withMessage('Debe ser una fecha válida ').run(req);

  await check('password').notEmpty().withMessage('Contraseña campo obligatorio').isLength({min: 8}).withMessage('El password debe de ser de almenos 6 caracteres').run(req)   
  
  
  await check('pass2_usuario').equals(req.body.password).withMessage('Los password no son iguales').run(req)   
  
  
  
  let resultado=validationResult(req)


  //verificar que el resultado este vacio

//return res.json(resultado.array())



    if(!resultado.isEmpty()){
      return res.render('auth/register',{
        page: "Error al intentar al crear la cuenta...",
        csrfToke: req.csrfToken(),
        errores: resultado.array(),
        usuario:{
          nombre: req.body.nombre,
          email: req.body.email,
          birthdate: req.body.birthdate
        }
      })

    }
  // extraer los datos 
  const {nombre, email,birthdate, password} =req.body

  //vreificar que el ususario no este duplicado

  const existeUsuario= await Usuario.findOne({where:{email}})
  
  if(existeUsuario){
    return res.render('auth/register',{
      page: "Error al intentar al crear la cuenta...",
      csrfToke: req.csrfToken(),
      errores: [{msg: 'El usuario ya esta registrado'}],
      usuario:{
        nombre: req.body.nombre,
        email: req.body.email,
        birthdate: req.body.birthdate
      }
    })

  }
  

  //almacenar un usuario
  const usuario= await Usuario.create({
    nombre,
    email,
    birthdate,
    password,
    token: generatetId()

  })
  // envia emailo de confirmacion
   emailRegistro({
      nombre: usuario.nombre,
      email:  usuario.email,
      token:  usuario.token

   })


  //Mostra mensaje de confirmacion

  res.render('templates/message', {
    page: 'Cuenta creada  ',
    msg: `Hemos enviado un Email de confirmación al correo ${email}`

  })

// Funcion que comprueba una cuenta
// dotev para proteger las crendeciales de un sistema

  


//verificacion de la contraseña
  
  
 // const usuario= await Usuario.create(req.body)
   // res.json(usuario)
}





const confirmar = async (req,res ) => {
  const {token}= req.params
  
  //verificar si el token e3s valido
  const usuario= await Usuario.findOne({where: {token}})
if(!usuario){
  res.render('auth/confirmar-cuenta',{
       page: 'Error al confirmar tu cuenta  ',
        msg: `Hubo un error al confirmar tu cuenta, intenta de nuevo`,
          link: `${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/usuario/passwordRecovery`,
          error: true

 })

}else{
  //confirmar la cuenta
 usuario.token=null;
 usuario.confirmado=true;
 await usuario.save();
}
  
   res.render('auth/confirmar-cuenta',{
  page: ' Cuenta Confirmada ',
   msg: `La cuenta se confirmo correctamente`,
   link: `${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/usuario/login`,
        

})


}

  const formularioPasswordRecovery =(request,response) => {
    response.render('auth/passwordRecovery',{


    })
  };









  export  {
    formularioLogin, 
    formularioRegister, 
    registrar,
    confirmar,
    formularioPasswordRecovery
  }






















