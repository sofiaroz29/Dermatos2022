import { Router } from "express";
import multer from "multer";
import  Reporte  from '../models/reporte.js';
import path from "path";
import {jsPDF} from "jspdf";
import fetch from 'node-fetch';
import FormData from 'form-data';
import cloudinary from 'cloudinary';
import fs from 'fs'
import jwt from "jsonwebtoken"
import Usuario from '../models/usuarios.js';

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|jfif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Formato de imagen invalido')
    }
});

router.post('/upload', upload.array("imagen", 1), async (req,res) =>{

    const token = req.headers.authorization;

    // const {parte_del_cuerpo, sintomas, antecedentes, conducta_sol, fototipos} = req.body;
    const imagen = req.files[0]

    console.log(token);

    var imageAsBase64 = fs.readFileSync(imagen.path, 'base64');
    var resultanalysis
    await fetch ("http://127.0.0.1:8080/flask", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "image": imageAsBase64,
            "filename": imagen.filename,
        })
    }).then((response) => response.text())
    .then((data) => {
        resultanalysis = data
        console.log(resultanalysis)
    })
    .catch(err => console.log('Error:', err));

    console.log(resultanalysis)
    res.send(resultanalysis);

    // .then((response) => response.text())
    // .then((result) => {result = resultanalysis})
    // .then(() => {
    //     console.log(resultanalysis);
    // })
    // .catch(err => console.log('Error:', err));

    // .then((response) => response.text())
    // .then((data) => console.log(data))
    // .then((result) => console.log(result))
    // .catch(err => console.log('Error:', err));

    // const results = await response;
    // res.set(results);
    // return res
        
    //     .then(response => response.json())
    //    .then(json => jsonResponse = json)  
    //    .then(result => console.log(result))
    //    .catch(err => console.log('Error:', err));
    

    if (!!token){
        const accesstoken = token.split(" ")[1];
        console.log(accesstoken);
        const verify = jwt.verify(accesstoken, process.env.JWT_SECRET);
        const getUser = await Usuario.findOne({ where: { id: verify.id } }).catch((err) => {
            console.log("Error: ", err);
        });
        
        if (!req.files) {
            res.send("File was not found");
            return;
        }
        
        

        const imgformat = (imagen.mimetype).split('/');
        console.log(imgformat); 
    
        const newAnalysisRequest = await Reporte.create({
            parte_del_cuerpo,
            sintomas,
            antecedentes,
            conducta_sol,
            fototipos,
            imagen: imagen.path,
            imgformat: imgformat[1],
            usuarioId: getUser.id,
            estado: response,
        });

        if (newAnalysisRequest) {
            console.log("se ha subido correctamente");
        }
    }

    
    if (!req.files) {
        res.json({message: "Debes ingresar una imagen"});
    };
    
    // cloudinary.config({ 
    //     cloud_name: process.env.CLOUD_NAME, 
    //     api_key: process.env.API_KEY, 
    //     api_secret: process.env.API_SECRET,
    //     secure: true
    //   });
   
    //const imageUrl = cloudinary.image(req.files[0].filename)
    return;
});


router.get('/analysisresults', async (req,res) =>{ 

    const {token} = req.headers.authorization;

    const accesstoken = token.split(" ")[1];
    const verify = jwt.verify(accesstoken, process.env.JWT_SECRET);


    const analysis = await Reporte.findOne({ 
        where: { id: verify.id },
        order:[ [ 'createdAt', 'DESC' ]],
    }).catch((err) => {
        console.log("Error: ", err);
    });
   
    const user = await Usuario.findOne({
        where: { id: verify.id }
    }).catch((err) => {
        console.log("Error: ", err);
    });

    console.log(analysis);

    // const doc = new jsPDF();
    // doc.setFontSize(40);
    // doc.setFont("helvetica", "bold");
    // doc.text("Informe", 105, 45, null, null, "center");
    // doc.setFontSize(23);
    // doc.setFont("helvetica", "normal");
    // doc.text("Fecha: " + analysis.createdAt, 30, 80);
    // doc.text("Datos Personales", 30, 95); 
    // doc.setFontSize(20);
    // doc.setFontSize(23);
    // doc.text("Evaluacion", 30, 142);
    // doc.setFontSize(20);
    // doc.text("Parte del cuerpo: " + analysis.parte_del_cuerpo, 30, 153); 
    // doc.text("Síntomas: " + analysis.sintomas, 30, 162);
    // doc.text("Antecedentes: " + analysis.antecedentes, 30, 172);
    // doc.text("Conducta respecto al sol: " + analysis.conducta_sol, 30, 182);
    // doc.text("Fototipo: " + analysis.fototipos, 30, 192);
    // doc.setFontSize(23);
    // doc.text("Resultado: " + analysis.estado, 30, 212);
    // doc.addImage(analysis.imagen, analysis.imgformat, 30, 225, 50, 50);
    
    // doc.save("Analysis-Dermatos-" + Date.now() + ".pdf");
});


export default router;
