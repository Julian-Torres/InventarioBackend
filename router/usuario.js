const {Router}=require('express');
const Usuario=require('../models/Usuario')
const {validarUsuario} =require('../helpers/validarUsuario');

const router=Router(); 

router.post('/',async function(req,res){
    console.log(req.body);

    try{
        const validaciones =validarUsuario(req);
      if(validaciones.length >0){
        return res.status(400).send(validaciones);
      }

        const existeUsuario=await Usuario.findOne({email:req.body.email});
        if(existeUsuario){
            return res.status(400).send('Email ya existe');
        }

        let usuario= new Usuario();
        usuario.nombre=req.body.nombre;
        usuario.email=req.body.email;
        usuario.estado=req.body.estado;
        usuario.fechaCreacion=new Date();
        usuario.fechaActualizacion=new Date();
        
        usuario= await usuario.save();
        res.send(usuario);
    }catch(error){
        console.log(error);
        res.status(500).send ('Error');
    }   

});
router.get('/',async function(req,res){
    try {
        const usuarios=await Usuario.find();
        res.send(usuarios);
        
    } catch (error) {
        console.log(error);
        res.status(500).send ('Error');
    }
});
router.put('/:usuarioId',async function(req,res){
    try{
        const validaciones =validarUsuario(req);
        if(validaciones.length >0){
          return res.status(400).send(validaciones);
        }
        
        console.log('objeto',req.body,req.params);

        let usuario=await Usuario.findById(req.params.usuarioId);

        if (!usuario){
            return res.status(400).send('usuario no existe');
        }
        
        const existeUsuario=await Usuario.findOne({email:req.body.email,_id:{$ne:usuario._id}});


        if(existeUsuario){
            return res.status(400).send('Email ya existe');
        } 

        usuario.email=req.body.email;
        usuario.nombre=req.body.nombre;
        usuario.estado=req.body.estado;
        usuario.fechaActualizacion=new Date();
        
        usuario= await usuario.save();
        res.send(usuario);
    }catch(error){
        console.log(error);
        res.status(500).send ('Error');
    }
});

module.exports=router; 