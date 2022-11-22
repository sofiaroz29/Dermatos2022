import { Router } from "express";
import Usuario from '../models/usuarios.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const router = Router();



router.post('/register', async (req, res) => {
  const { nombre, apellido, email, contrasenia } = req.body;

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



router.post('/login', async (req, res) => {
  const { email, contrasenia } = req.body;
  console.log(req.body)
  const userWithEmail = await Usuario.findOne({ where: { email } }).catch((err) => {
    console.log("Error: ", err);
  });

  if (!userWithEmail)
    return res.json({ message: "Email y/o contraseña son incorrectas" });



  await bcrypt.compare(contrasenia, userWithEmail.contrasenia, function (err, result) {
    if (err) {
      throw err
    }

    if (result) {
      const jwtToken = jwt.sign({ id: userWithEmail.id, email: userWithEmail.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      res.json({ message: "Bienvenido " + userWithEmail.nombre + "!" , token: jwtToken}, );

    }
    else {
      return res.json({ message: "Email y/o contraseña son incorrectas" });
    }


  });




});


router.get ('/myprofile', async (req, res) =>{
  const {authtoken} = req.headers.authorization;
  
  if (!authtoken) 
    return res.status(401).json({ error: 'Debes estar logueado' });
  
  try {
    const accesstoken = authtoken.split(" ")[1];
    const verify = jwt.verify(accesstoken, process.env.JWT_SECRET);

    const getUser = await Usuario.findOne({ where: { id: verify.id } }).catch((err) => {
    console.log("Error: ", err);
    });

    // const getUserReport = await Reporte.findOne({ where: { usuarioId: verify.id } }).catch((err) => {
    //   console.log("Error: ", err);
    // });

    res.send(getUser);
    
  }

  catch (err) {
    console.log(err);
    res.send('Algo salio mal.. :(');
  }


});

router.post('/myprofile', async (req, res) =>{
  const {authtoken} = req.headers.authorization;
  const {nombre, apellido, email} = req.body;
  
  if (!authtoken) 
    return res.status(401).json({ error: 'Debes estar logueado' });
  
  try {
    const accesstoken = authtoken.split(" ")[1];
    const verify = jwt.verify(accesstoken, process.env.JWT_SECRET);

    const getUser = await Usuario.findOne({ where: { id: verify.id } }).catch((err) => {
    console.log("Error: ", err);
    });

    getUser.set({
      nombre: nombre,
      apellido: apellido,
      email: email,
    });

    await updatePassword.save();

    res.send("Los cambios han sido guardados")
  }

  catch (err) {
    console.log(err);
    res.send('Algo salio mal.. :(');
  }

})


router.post('/forgotpassword', async (req, res) => {
  const { email } = req.body;
  const userWithEmail = await Usuario.findOne({ where: { email } }).catch((err) => {
    console.log("Error: ", err);
  });

  if (!userWithEmail) {
    return res.json({ message: "El correo electronico no existe" });
  }

  const token = jwt.sign({ id: userWithEmail.id, email: userWithEmail.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const linkk = `http://localhost:3000/api/usuario/resetpassword/${token}`;
  const link = `http://localhost:5500/Dermatos/newPassword.html?token=${token}`;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
      user: process.env.AUTH_USER, 
      pass: process.env.AUTH_PASS, 
    },
  });

  let info = await transporter.sendMail({
    from: process.env.AUTH_USER, 
    to: userWithEmail.email, 
    subject: "Restaurar contraseña", 
    html: `
    <h3>Entre en el link de abajo para cambiar su contraseña</h3>
    <a href="${link}">${link}/ </a>` , 
  }, function (error, info){
    if (error) {
      console.log(error);
    } else {
      res.send("Ya se ha enviado el email: " + info.response);
    }
  });



  console.log(linkk);
  res.send("Ya se ha enviado el email");

});

// router.get('/resetpassword/:id/:token', async (req, res) => {
//   const { authtoken } = req.headers.authorization;
//   if (!token) 
//     return res.status(401).json({ error: 'Acceso denegado' })
  

  

//   try {
//     const accesstoken = authtoken.split(" ")[1];
//     const verify = jwt.verify(accesstoken, process.env.JWT_SECRET);

//     res.send('verified');

//   } catch (error) {
//     res.send('not verified');
//   }

// });

router.post('/resetpassword/:token', async (req, res) => {
  const { email, newpassword, confirmpassword } = req.body;
  // const queryString = window.location.search;
  // const urlParams = new URLSearchParams(queryString);
  // const token = urlParams.get('token');
  const {token} = req.params;
  console.log(typeof token)

  
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);

    if (newpassword === confirmpassword){
      const encryptedPassword = await bcrypt.hash(newpassword, 10);
      console.log(encryptedPassword);


      const updatePassword = await Usuario.findOne({ where: { id: verify.id } }).catch((err) => {
      console.log("Error: ", err);
      });

      updatePassword.set({
        contrasenia: encryptedPassword,
      });

      await updatePassword.save();


      res.send('Cambio de contraseña exitoso');
    }

    else {
      res.send('Los campos ingresados no son iguales');
    }
    

  } catch (err) {
    console.log(err);
    res.send('Algo salio mal.. :(');
  }





});


export default router;