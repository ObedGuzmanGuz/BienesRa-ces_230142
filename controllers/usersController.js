 import { check, validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js'
import {generateJWT, generatetId } from '../helpers/tokens.js';
import {emailRegistro,emailChangePassword} from '../helpers/emails.js' 
import { request, response } from 'express';
import moment from 'moment';
import { Result } from 'postcss';
import { where } from 'sequelize';




const formularioLogin =(request,response) => {
    response.render('auth/login',{
      csrfToken: request.csrfToken(),
      page: 'iniciar Sesion'
    })
  };

  const useratentication = async(req,res) =>{
    //validacion

    await check('email').notEmpty().withMessage('No es un Email').isEmail().withMessage('Correo campo obligatorio').run(req) 
    
     await check('password').notEmpty().withMessage('Contraseña campo obligatorio').isLength({min: 8}).withMessage('El password debe de ser de almenos 8 caracteres').run(req)   
  
     let resultado = validationResult(req)
     if(!resultado.isEmpty()){
      return res.render('auth/login',{
        page: "Iniciar sesion...",
        csrfToken: req.csrfToken(),
        errores: resultado.array(),
        
      })

    }

    //comprobar si el usuario existe


    const {email, password}= req.body

    const usuario= await Usuario.findOne({where: {email}})
     
    if(!usuario){
      return res.render('auth/login',{
        page: "Iniciar sesion...",
        csrfToken: req.csrfToken(),
        errores: [{msg: "El usuario no existe"}]
        
      })
    }


    //comprobar si el usuario esta confirmado
    if(!usuario.confirmado){
      return res.render('auth/login',{
        page: "Iniciar sesion...",
        csrfToken: req.csrfToken(),
        errores: [{msg: "Tu cuenta no ha sido confirmada"}]
        
      })

    }

   //Revisar el password

   if(!usuario.verificarPassword(password)){
    return res.render('auth/login',{
      page: "Iniciar sesion...",
      csrfToken: req.csrfToken(),
      errores: [{msg: "El password es incorrecto"}]
      
    })
   }

   //Autenticar el usuario

  const token= generateJWT({id:usuario.id, nombre: usuario.nombre}) 
  
   console.log(token)


//Almacenar en un cookie


return res.cookie('_token', token,{
    httpOnly: true,
    secure: true,
    sameSite: true
}).redirect('/my-properties')



  }




  const formularioRegister =(request,response) => {
   
    response.render('auth/register',{
      
      csrfToken: request.csrfToken(),

    })
  };

const registrar = async (req,res) =>{
    //Validacion
  
  await check('nombre').notEmpty().withMessage('El nombre no puede ir vacio,campo obligatorio').run(req) 



  await check('email').notEmpty().withMessage('No es un Email').isEmail().withMessage('Correo campo obligatorio').run(req) 
  await check('birthdate')
  .notEmpty().withMessage('La fecha de nacimiento es obligatoria')
  .isDate().withMessage('Debe ser una fecha válida')
  .custom((value) => {
    const birthDate = moment(value, 'YYYY-MM-DD');
    const age = moment().diff(birthDate, 'years');
    if (age < 18) {
      throw new Error('Debes ser mayor de edad para registrarte');
    }
    return true;
  })
  .run(req);

// Verificar los errores después de la validación



  await check('password').notEmpty().withMessage('Contraseña campo obligatorio').isLength({min: 8}).withMessage('El password debe de ser de almenos 8 caracteres').run(req)   
  
  
  await check('pass2_usuario').equals(req.body.password).withMessage('Los password no son iguales').run(req)   
  
  
  
  let resultado=validationResult(req)


  //verificar que el resultado este vacio

//return res.json(resultado.array())



    if(!resultado.isEmpty()){
      return res.render('auth/register',{
        page: "Error al intentar al crear la cuenta...",
        csrfToken: req.csrfToken(),
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
      csrfToken: req.csrfToken(),
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
    msg: `Hemos enviado un Email de confirmación al correo  ${email}`

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
          link: `${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/usuario/createAccount`,
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

 const passwordReset = async(request, response) => {

  console.log("Validando los datos para la recuperacion de la contraseña")
  //Validacion de los campos que se recibe del formulario

  //Validacion de frontend
  await check('email').notEmpty().withMessage("El correo electronico es un campo obligatorio").run(request)
  await check('email').isEmail().withMessage("El correo electronico no tiene el formato de: usuario@dominio.extension").run(request)
  let result = validationResult(request)

  //  verificamos si hay errores de validacion

  if(!result.isEmpty()){
      return response.render("auth/passwordRecovery",{
        page: 'Error al intetar resetear la contraseña',
        errors: result.array(),
        csrfToken: request.csrfToken()
      })
  }

  const {email:email} = request.body
  //Validacion de BACKEND
  //Verificacion que el usuario no existe previamente emn la bd
  const existingUser = await Usuario.findOne({where: {email, confirmado:1}})

  if(!existingUser){
    return response.render("auth/passwordRecovery",{
      page: 'Error, no existe una cuenta autenticada asociada al correo electronico ingresado',
      csrfToken: request.csrfToken(),
      errors: [{msg: `Por favor revisa los datos e intentalo de nuevo`}],
      user: {
        email:email

      }})

  }


  //Registramos los datos en la base de datos.
      existingUser.password= "";
      existingUser.token= generatetId();
     await existingUser.save();

//Enviar el correo de confirmacion

emailChangePassword({
 nombre: existingUser.nombre,
      email:  existingUser.email,
      token:  existingUser.token
  

})

response.render('templates/message', {
  page: 'Restablece tu password  ',
  msg: `Hemos enviado  un email con las instrucciones a  ${email}`

})




}









  const formularioPasswordRecovery = async (request,response) => {
    response.render('auth/passwordRecovery',{
     csrfToken: request.csrfToken(),
    })
  };


const verifyTokenPasswordChange= async(request, response) =>{

  const {token}= request.params;
  const userTokenOwner = await Usuario.findOne({where: {token}})


  if(!userTokenOwner){
    
    response.render('templates/message', {
      page: 'Error   ',
      msg: `El token ha expirado o no existe `,
      error: true
      })
  }

 
  response.render('auth/resetpassword', {
    csrfToken: request.csrfToken(),
    page: 'Actualiza tu contraseña  ',
    msg: `Por favor ingresa tu nueva contraseña `


    })

}


const updatePassword= async(request, response) =>{
  const {token}= request.params

//Validar campos de contraseña
await check('new_password').notEmpty().withMessage('Contraseña campo obligatorio').isLength({min: 8}).withMessage('El password debe de ser de almenos 8 caracteres').run(request)   
  
await check('Confirm_new_password').equals(request.body.new_password).withMessage('Los password no son iguales').run(request)   
console.log('new_password:', request.body.new_password);
console.log('Confirm_new_password:', request.body.Confirm_new_password);


let result= validationResult(request)



if(!result.isEmpty()){
  return response.render('auth/resetpassword',{
    page: "Error al intentar al crear la cuenta...",
    csrfToken: request.csrfToken(),
    errores: result.array(),
    usuario:{
      nombre: request.body.nombre,
      email: request.body.email,
      birthdate: request.body.birthdate
    }
  })

}

// Actualizar en BD el pass
//Renderizar la respuesta

const UserTokenOwner= await Usuario.findOne({where:{token}})

UserTokenOwner.password = request.body.new_password
UserTokenOwner.token=null;

UserTokenOwner.save(); //update tb_users set password=new_password where token=token;

response.render('auth/confirmar-cuenta',{
  page: ' Excelente ',
   msg: `Actualizacion de contraseña exitosa`,
   link: `${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/usuario/login`,
        

})




}







  export  {
    formularioLogin, 
    useratentication,
    formularioRegister, 
    registrar,
    confirmar,
    formularioPasswordRecovery,
    passwordReset,
    verifyTokenPasswordChange,
    updatePassword,
    
  }






















