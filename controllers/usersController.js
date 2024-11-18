 import { check, validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js'
import { generatetId } from '../helpers/tokens.js';
import {emailRegistro} from '../helpers/emails.js' 
const formularioLogin =(request,response) => {
    response.render('auth/login',{

    })
  };


  const formularioRegister =(request,response) => {
    response.render('auth/register',{
      page: "Crear cuenta..."

    })
  };

const registrar = async (req,res) =>{
    //Validacion
  
  await check('nombre').notEmpty().withMessage('El nombre no puede ir vacio,campo obligatorio').run(req) 
  await check('email').notEmpty().withMessage('No es un Email').isEmail().withMessage('Correo campo obligatorio').run(req) 
  await check('password').notEmpty().withMessage('Contraseña campo obligatorio').isLength({min: 8}).withMessage('El password debe de ser de almenos 6 caracteres').run(req)   
  
  
  await check('pass2_usuario').equals(req.body.password).withMessage('Los password no son iguales').run(req)   
  
  
  
  let resultado=validationResult(req)


  //verificar que el resultado este vacio

//return res.json(resultado.array())



    if(!resultado.isEmpty()){
      return res.render('auth/register',{
        page: "Error al intentar al crear la cuenta...",
        errores: resultado.array(),
        usuario:{
          nombre: req.body.nombre,
          email: req.body.email
        }
      })

    }
  // extraer los datos 
  const {nombre, email, password} =req.body

  //vreificar que el ususario no este duplicado

  const existeUsuario= await Usuario.findOne({where:{email}})
  
  if(existeUsuario){
    return res.render('auth/register',{
      page: "Error al intentar al crear la cuenta...",
      errores: [{msg: 'El usuario ya esta registrado'}],
      usuario:{
        nombre: req.body.nombre,
        email: req.body.email
      }
    })

  }
  

  //almacenar un usuario
  const usuario= await Usuario.create({
    nombre,
    email,
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
    msg: 'Hemos enviado un Email de confirmacion'

  })




//verificacion de la contraseña
  
  
 // const usuario= await Usuario.create(req.body)
   // res.json(usuario)
}



  const formularioPasswordRecovery =(request,response) => {
    response.render('auth/passwordRecovery',{


    })
  };









  export  {
    formularioLogin, 
    formularioRegister, 
    registrar,
    formularioPasswordRecovery
  }






















