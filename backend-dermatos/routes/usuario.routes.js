import { Router } from "express";
import  Usuario  from '../models/usuarios.js';
import jwt from "jsonwebtoken";
import multer from "multer";

const router = Router();

router.post('/signup', async (req,res) => {
    const {nombre, apellido, email, contrasenia} = req.body;
     
    const alreadyExistsUser = await Usuario.findOne({ where: { email } }).catch((err) => {
          console.log("Error: ", err);
        }
      );
    
      if (alreadyExistsUser) {
        return res.status(409).json({ message: "Ya existe un usuario con este email" });
      }
    
      console.log(req.body);

    const newUser = await Usuario.create({
         nombre,
         apellido,
         email,
         contrasenia,
     })

     if (newUser) res.json({ message: "Usuario registrado" });
}); 



router.post('/login', async (req,res) => {
    const {email, contrasenia} = req.body;
    const userWithEmail = await Usuario.findOne({where: {email} }).catch((err) => {
      console.log("Error: ", err);
    }
    );
    
    if(!userWithEmail)
      return res.json({message:"Email y/o contraseña son incorrectas"});
    


    if(userWithEmail.contrasenia !== contrasenia)
      return res.json({message:"Email y/o contraseña son incorrectas"});
    
    const jwtToken = jwt.sign({ id: userWithEmail.id, email: userWithEmail.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
 

   
    res.json({message:"Bienvenido " + userWithEmail.nombre + "!", token: jwtToken});
    
});

router



export default router;