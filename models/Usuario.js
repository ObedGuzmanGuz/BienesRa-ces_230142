import { DataTypes } from "sequelize";
import db from '../config/db.js'
import bcrypt from 'bcrypt'

const Usuario= db.define('tbb_users',{
    nombre: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    email:{

        type: DataTypes.STRING,
        allowNull: false ,   
        unique:true
    }, 
    birthdate: {
        type: DataTypes.DATEONLY, 
        allowNull: false
      },
    password:{
        type: DataTypes.STRING,
        allowNull: false 
    },
    token: DataTypes.STRING,
     confirmado: DataTypes.BOOLEAN   
    

},{

  hooks: {
    beforeCreate: async function(usuario){
        const salt=await bcrypt.genSalt(10)
        usuario.password= await bcrypt.hash(usuario.password,salt);
    },
    beforeUpdate: async function(usuario){
      //verificar que existe un token y que este confirmado
      //TODO: verificar que existe y que este confirmado. Tareaaaaaaaaaaaaa
      const existingUser = await Usuario.findOne({ where: { id: usuario.id } });
    
      if (!existingUser) {
          throw new Error("El usuario no existe.");
      }
  
      if (!existingUser.confirmado) {
          throw new Error("El usuario no está confirmado.");
      }
      //Genramos la clave para el hasheo, se recomiendan 1o rondas de
      const salt=await bcrypt.genSalt(10)
      usuario.password= await bcrypt.hash(usuario.password,salt);
  }
  }   
})

export default Usuario 