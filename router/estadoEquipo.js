const {Router}=require('express');
const EstadoEquipo=require('../models/EstadoEquipo');
const {validarEstadoEquipo} =require('../helpers/validarEstadoEquipo');

const router=Router(); 

router.post('/',async function(req,res){
    try {

        const validaciones =validarEstadoEquipo(req);
        if(validaciones.length >0){
            return res.status(400).send(validaciones);
        }

        let estadoEquipo=new EstadoEquipo();
        estadoEquipo.nombre=req.body.nombre;
        estadoEquipo.estado=req.body.estado;
        estadoEquipo.fechaCreacion=new Date();
        estadoEquipo.fechaActualizacion=new Date();

        estadoEquipo=await estadoEquipo.save();
        res.send(estadoEquipo);


    } catch (error) {
        console.log(error);
        res.status(500).send ('Error');
    }
});
router.get('/',async function(req,res){
    try {
        const estadoEquipo=await EstadoEquipo.find();
        res.send(estadoEquipo);
    } catch (error) {
        console.log(error);
        res.status(500).send ('Error');
    }
});
router.put('/:estadoequipoId',async function(req,res){
    try {

        const validaciones =validarEstadoEquipo(req);
        if(validaciones.length >0){
            return res.status(400).send(validaciones);
        }

        let estadoEquipo= await EstadoEquipo.findById(req.params.estadoequipoId);
        if(!estadoEquipo){
            return res.status(400).send('No existe ese estado');
        }
        estadoEquipo.nombre=req.body.nombre;
        estadoEquipo.estado=req.body.estado;
        estadoEquipo.fechaActualizacion=new Date();

        estadoEquipo=await estadoEquipo.save();
        res.send(estadoEquipo);

    } catch (error) {
        console.log(error);
        res.status(500).send ('Error');
    }
});

module.exports=router;