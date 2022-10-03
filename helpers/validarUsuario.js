const validarUsuario=(req)=>{
    const validacion=[];

    if (!req.body.nombre){
        validacion.push('Falto el nombre ');}
    if (!req.body.email){
        validacion.push('Falto el email ');}
    if (!req.body.estado){
        validacion.push('Falto el estado ');}

    return validacion
}    
module.exports={validarUsuario,
}