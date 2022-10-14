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
     });

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

router.post('/forgotpassword', async (req, res) =>{
  const {email} = req.body;
  const userWithEmail = await Usuario.findOne({where: {email} }).catch((err) => {
    console.log("Error: ", err);
  });

  if(!userWithEmail){
    return res.json({message:"El correo electronico no existe"});
  }
      
  const secret = process.env.JWT_SECRET + userWithEmail.password;
  const token = jwt.sign ({ id: userWithEmail.id, email: userWithEmail.email }, secret, {
    expiresIn: "1h",
  });

  const link = `http://localhost:3000/api/usuario/reset-password/${userWithEmail.id}/${token}`;
  console.log(link);
  res.send('ok');

});

router.get('/resetpassword/:id/:token', async(req,res) =>{
  const {id, token} = req.params;
  const {password, confirmpassword} = req.body;

  const userWithEmail = await Usuario.findOne({where: {id} }).catch((err) => {
    console.log("Error: ", err);
  });

  const secret = process.env.JWT_SECRET + userWithEmail.password;

  try{
    const verify = jwt.verify(token, secret);
    const encryptedPassword = bcrypt.hash(password, 10);

    res.send('verified');
  } catch(error){
    res.send('not verified');
  }
  


});



export default router;