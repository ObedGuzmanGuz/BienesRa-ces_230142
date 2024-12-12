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
    beforeUpdate: async function(usuario) {
        // Verificar si la contraseña fue modificada y no está vacía
        if (usuario.changed('password') && usuario.password) {
            const salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(usuario.password, salt);
        }
        // Si la contraseña es null o una cadena vacía, el hook no hace nada
    }
    
  }   
})


//Meotodos Personalizados

Usuario.prototype.verificarPassword= function(password){
        return bcrypt.compareSync(password, this.password)

} 




export default Usuario 