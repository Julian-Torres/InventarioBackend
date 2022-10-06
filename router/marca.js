const {Router}=require('express');
const Marca=require('../models/Marca')
const {validarMarca} =require('../helpers/validarMarca');

const router=Router();  

router.post('/',async function(req,res){
    try {

        const validaciones =validarMarca(req);
        if(validaciones.length >0){
            return res.status(400).send(validaciones);
        }

        let marca=new Marca();
        marca.nombre=req.body.nombre;
        marca.estado=req.body.estado;
        marca.fechaCreacion=new Date();
        marca.fechaActualizacion=new Date();

        marca=await marca.save();
        res.send(marca);


    } catch (error) {
        console.log(error);
        res.status(500).send ('Error');
    }
});
router.get('/',async function(req,res){
    try {
        const marcas=await Marca.find();
        res.send(marcas);
    } catch (error) {
        console.log(error);
        res.status(500).send ('Error');
    }
});
router.put('/:marcaId', async function(req,res){

    const validaciones =validarMarca(req);
    if(validaciones.length >0){
        return res.status(400).send(validaciones);
    }

    try {
        let marca= await Marca.findById(req.params.marcaId);
        if(!marca){
            return res.status(400).send('No existe la marca');
        }
        marca.nombre=req.body.nombre;
        marca.estado=req.body.estado;
        marca.fechaActualizacion=new Date();

        marca=await marca.save();
        res.send(marca);


    } catch (error) {
        console.log(error);
        res.status(500).send ('Error');
    }
});

router.get('/:marcaId',async function(req,res){
    try {
      const marca=await Marca.findById(req.params.marcaId);
      if(!marca){
       return res.status(404).send('Marca No existe');
      }
      res.send(marca);
    } catch (error) {
         console.log(error);
         res.status(500).send ('Error');
    }
 });

module.exports=router;