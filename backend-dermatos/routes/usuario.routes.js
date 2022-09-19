import { Router } from "express";
import  Usuario  from '../models/usuarios.js';

const router = Router();

router.post('/registrarse', async (req,res) => {
    const {nombre, apellido, email, edad, contrasenia} = req.body;
     
    const alreadyExistsUser = await Usuario.findOne({ where: { email } }).catch((err) => {
          console.log("Error: ", err);
        }
      );
    
      if (alreadyExistsUser) {
        return res.status(409).json({ message: "Ya existe un usuario con este email" });
      }
    
    const newUser = await Usuario.create({
         nombre,
         apellido,
         email,
         edad,
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
   
    res.json({message:"Bienvenido nuevamente"})
    
});



export default router;