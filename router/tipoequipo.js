const {Router}=require('express');
const TipoEquipo = require('../models/TipoEquipo');
const {validarTipoEquipo} =require('../helpers/validarTipoEquipo');

const router=Router(); 

router.post('/',async function(req,res){
    try {

        const validaciones =validarTipoEquipo(req);
        if(validaciones.length >0){
            return res.status(400).send(validaciones);
        }

        let tipoEquipo=new TipoEquipo();
        tipoEquipo.nombre=req.body.nombre;
        tipoEquipo.estado=req.body.estado;
        tipoEquipo.fechaCreacion=new Date();
        tipoEquipo.fechaActualizacion=new Date();

        tipoEquipo=await tipoEquipo.save();
        res.send(tipoEquipo);


    } catch (error) {
        console.log(error);
        res.status(500).send ('Error');
    }
});
router.get('/',async function(req,res){
    try {
        const tiposEquipo=await TipoEquipo.find();
        res.send(tiposEquipo);
    } catch (error) {
        console.log(error);
        res.status(500).send ('Error');
    }
});
router.put('/:tipoEquipoId', async function(req,res){
    try {

        const validaciones =validarTipoEquipo(req);
        if(validaciones.length >0){
            return res.status(400).send(validaciones);
        }

        let tipoEquipo= await TipoEquipo.findById(req.params.tipoEquipoId);
        if(!tipoEquipo){
            return res.status(400).send('No existe este tipo');
        }
        tipoEquipo.nombre=req.body.nombre;
        tipoEquipo.estado=req.body.estado;
        tipoEquipo.fechaActualizacion=new Date();

        tipoEquipo=await tipoEquipo.save();
        res.send(tipoEquipo);


    } catch (error) {
        console.log(error);
        res.status(500).send ('Error');
    }
});
router.get('/:tipoEquipoId',async function(req,res){
    try {
      const tipoEquipo=await TipoEquipo.findById(req.params.tipoEquipoId);
      if(!tipoEquipo){
       return res.status(404).send('tipoEquipo No existe');
      }
      res.send(tipoEquipo);
    } catch (error) {
         console.log(error);
         res.status(500).send ('Error');
    }
 });

module.exports=router;