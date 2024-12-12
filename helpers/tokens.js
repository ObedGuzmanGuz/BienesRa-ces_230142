import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

const generateJWT= datos => jwt.sign ({
        id:datos.id  ,
        nombre: datos.nombre,
        name: 'Developer Obed Guzman',
        enterprise: 'Ut xicotepec',
        software: 'Aplicaciones de Bienes raices'

       }, process.env.JWT_SECRET, {
        expiresIn: '1d'
       }  
      )




const generatetId= () =>  Math.random().toString(32).substring(2)+ Date.now().toString(32)


export{
 generateJWT,   
generatetId

}