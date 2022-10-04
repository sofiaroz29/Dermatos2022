import { Router } from "express";
import multer from "multer";
import path from "path";
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

router.post('/upload', async (req,res) =>{

    const upload = multer({
        storage: storage,
        limits: { fileSize: '1000000' },
        fileFilter: (req, file, cb) => {
            const fileTypes = /jpeg|jpg|png|gif/
            const mimeType = fileTypes.test(file.mimetype)  
            const extname = fileTypes.test(path.extname(file.originalname))
    
            if(mimeType && extname) {
                return cb(null, true)
            }
            cb('Give proper files formate to upload')
        }
    }).single('imagen');

    const {parte_del_cuerpo, sintomas, antecedentes, conducta_sol, fototipos} = req.body;
    console.log(req.body);
    const newAnalysisRequest = await Reporte.create({
        parte_del_cuerpo,
        sintomas,
        antecedentes,
        conducta_sol,
        fototipos,
        //imagen: path.req.file,
    });

    if (!newAnalysisRequest) {
        res.json({message: "Debes ingresar una imagen"});
    }
    
    
    else{
        res.json({ message: "Se ha subido correctamente" });
    }
  



});



export default router;
