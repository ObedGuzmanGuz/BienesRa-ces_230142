import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const admin = async (req, res) => {
  try {
    const { _token } = req.cookies;

    if (!_token) {
      return res.redirect('/auth/login'); 
    }
    const decoded = jwt.verify(_token, process.env.JWT_SECRET);
    const usuario = await Usuario.findByPk(decoded.id);

    if (!usuario) {
      return res.redirect('/auth/login');
    }
    res.render('properties/admin', {
      pagina: "Mis propiedades",
      msg: 
      `Bienvenido  a Bienes Raices ${usuario.nombre}`
    });
  } catch (error) {
    console.error("Error en la funcion admin:", error);
    return res.redirect('/auth/login');
  }
};

export{ admin };