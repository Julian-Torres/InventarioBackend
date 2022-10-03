const {Router}=require('express');
const Inventario = require('../models/Inventario');
const {validarInventario} =require('../helpers/validarInventario');

const router=Router(); 

router.post('/', async function(req,res){
    try {
      const validaciones =validarInventario(req);
      if(validaciones.length >0){
        return res.status(400).send(validaciones);
      }

        const existeInventarioSerial=await Inventario.findOne({serial:req.body.serial});
        if (existeInventarioSerial){
            return res.status(400).send ('El serial ya existe');
        }
        let inventario=new Inventario();
        inventario.serial=req.body.serial;
        inventario.modelo=req.body.modelo;
        inventario.descripcion=req.body.descripcion;
        inventario.color=req.body.color;
        inventario.foto=req.body.foto;
        inventario.fechaCompra=req.body.fechaCompra;
        inventario.precio=req.body.precio;
        inventario.usuario=req.body.usuario._id;
        inventario.marca=req.body.marca._id;
        inventario.tipoEquipo=req.body.tipoEquipo._id;
        inventario.estadoEquipo=req.body.estadoEquipo._id;
        inventario.fechaCreacion=new Date();
        inventario.fechaActualizacion=new Date();

        inventario=await inventario.save();
        res.send(inventario);

      } catch (error) {
           console.log(error);
           res.status(500).send ('Error');
      }
});
router.get('/',async function(req,res){
   try {
     const inventarios=await Inventario.find().populate([
        { path: 'usuario', select:'nombre email estado'},
        {path: 'marca', select:'nombre estado'},
        {path: 'tipoEquipo', select:'nombre estado'},
        {path: 'estadoEquipo', select:'nombre estado'}
    ]);
     res.send(inventarios);
   } catch (error) {
        console.log(error);
        res.status(500).send ('Error');
   }
});
router.put('/:InventarioId',async function(req,res){
    try {

      const validaciones =validarInventario(req);
      if(validaciones.length >0){
        return res.status(400).send(validaciones);
      }

        let inventario=await Inventario.findById(req.params.InventarioId)
        if(!inventario){
            return   res.status(400).send('Este inventario no existe');
        }

        const existeInventarioSerial=await Inventario.findOne({serial:req.body.serial, _id:{$ne: inventario._id} });
        if (existeInventarioSerial){
            return res.status(400).send ('El serial ya existe');
        }
        inventario.serial=req.body.serial;
        inventario.modelo=req.body.modelo;
        inventario.descripcion=req.body.descripcion;
        inventario.color=req.body.color;
        inventario.foto=req.body.foto;
        inventario.fechaCompra=req.body.fechaCompra;
        inventario.precio=req.body.precio;
        inventario.usuario=req.body.usuario._id;
        inventario.marca=req.body.marca._id;
        inventario.tipoEquipo=req.body.tipoEquipo._id;
        inventario.estadoEquipo=req.body.estadoEquipo._id;
        inventario.fechaActualizacion=new Date();

        inventario=await inventario.save();
        res.send(inventario);

      } catch (error) {
           console.log(error);
           res.status(500).send ('Error');
      }
});
router.get('/:inventarioId',async function(req,res){
   try {
     const inventario=await Inventario.findById(req.params.inventarioId);
     if(!inventario){
      return res.status(404).send('Inventairo No existe');
     }
     res.send(inventario);
   } catch (error) {
        console.log(error);
        res.status(500).send ('Error');
   }
});

module.exports=router;