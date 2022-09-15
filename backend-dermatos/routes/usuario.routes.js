import { Router } from "express";
import  Usuario  from '../models/usuarios.js';

const router = Router();


router.post('/registrarse', async (req,res) => {
    const {nombre, apellido, email, edad, contraseña} = req.body;
     
    const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
        (err) => {
          console.log("Error: ", err);
        }
      );
    
      if (alreadyExistsUser) {
        return res.status(409).json({ message: "User with email already exists!" });
      }
    
    const newUser = await Usuario.create({
         nombre,
         apellido,
         email,
         edad,
         contraseña,
     })

     if (savedUser) res.json({ message: "Thanks for registering" });
}); 



// router.get('/iniciosesion', async (req,res) => {
//     const {nombre} = req.params;
//      try {
//       const especie = await Especies.findOne({
//         where: {nombre}
//         //attributes: ['nombre'] //para traer un campo especifico
//       })
//       res.json(especie);
//     } catch (error) {
//       return res.status(500).json({message:error.message});
//     }
    
    
// });



export default router;