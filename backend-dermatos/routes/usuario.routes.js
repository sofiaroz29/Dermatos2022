import { Router } from "express";
import  Usuario  from '../models/usuarios.js';
import jwt from "jsonwebtoken";
import multer from "multer";
import bcrypt from "bcryptjs";

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
    
    const encryptedPassword = await bcrypt.hash(contrasenia, 10);

    const newUser = await Usuario.create({
         nombre,
         apellido,
         email,
         contrasenia: encryptedPassword,
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
    


    await bcrypt.compare(contrasenia, userWithEmail.contrasenia){
      if(err){
        throw err
      }

      if(res){
        const jwtToken = jwt.sign({ id: userWithEmail.id, email: userWithEmail.email }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.json({message:"Bienvenido " + userWithEmail.nombre + "!", token: jwtToken});
      }
      else{
        return res.json({message:"Email y/o contraseña son incorrectas"});
      }
      

    });
      
    
     
    
});

router.post('/forgotpassword', async (req, res) =>{
  const {email} = req.body;
  const userWithEmail = await Usuario.findOne({where: {email} }).catch((err) => {
    console.log("Error: ", err);
  });

  if(!userWithEmail){
    return res.json({message:"El correo electronico no existe"});
  }
      
  const secret = process.env.JWT_SECRET + userWithEmail.contrasenia;
  const token = jwt.sign ({ id: userWithEmail.id, email: userWithEmail.email }, secret, {
    expiresIn: "1h",
  });

  const link = `http://localhost:3000/api/usuario/resetpassword/${userWithEmail.id}/${token}`;
  console.log(link);
  res.send('ok');

});

router.get('/resetpassword/:id/:token', async(req,res) =>{
  const {id, token} = req.params;

  const userWithEmail = await Usuario.findOne({where: {id} }).catch((err) => {
    console.log("Error: ", err);
  });

  const secret = process.env.JWT_SECRET + userWithEmail.contrasenia;

  try{
    const verify = jwt.verify(token, secret);

    res.send('verified');
  } catch(error){ 
    res.send('not verified');
  }
  
});

router.post('/resetpassword/:id/:token', async(req,res) =>{
  const {id, token} = req.params;
  const {newpassword, confirmpassword} = req.body;

  const userWithEmail = await Usuario.findOne({where: {id} }).catch((err) => {
    console.log("Error: ", err);
  });

  //const secret = process.env.JWT_SECRET + userWithEmail.contrasenia;

  try{
    //const verify = jwt.verify(token, secret);
    const encryptedPassword = bcrypt.hash(newpassword, 10);
    await Usuario.update (
    {
      password: encryptedPassword,
    }, 
    {
      where: {id: id},
    }
  );

    res.send('Cambio de contraseña exitoso');

  } catch(err){ 
    console.log (err);
    res.send('Algo salio mal.. :(');
  }
  


});


export default router;