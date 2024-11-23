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
    }
  }   
})

export default Usuario 