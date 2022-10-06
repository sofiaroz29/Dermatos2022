import { Router } from "express";
import multer from "multer";
import  Reporte  from '../models/reporte.js';

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

    const {parte_del_cuerpo, sintomas, antecedentes, conducta_sol, fototipos} = req.body;
    
    if (!req.files) {
        res.send("File was not found");
        return;
    }
    const newAnalysisRequest = await Reporte.create({
        parte_del_cuerpo,
        sintomas,
        antecedentes,
        conducta_sol,
        fototipos,
        imagen: req.files[0].path,
    });

    if (!newAnalysisRequest.imagen) {
        res.json({message: "Debes ingresar una imagen"});
    }
    
    
    else{
        res.json({ message: "Se ha subido correctamente" });
    }
  



});



export default router;
