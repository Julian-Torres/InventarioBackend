const validarInventario=(req)=>{
    const validacion=[];

    if (!req.body.serial){
        validacion.push('Falto el serial ');}
    if (!req.body.modelo){
        validacion.push('Falto el modelo ');}
    if (!req.body.descripcion){
        validacion.push('Falto la descripcion ');} 
    if (!req.body.color){
        validacion.push('Falto el color ');}
    if (!req.body.foto){
        validacion.push('Falto la foto ');}       
    if (!req.body.fechaCompra){
        validacion.push('Falto la fecha de compra ');}
    if (!req.body.precio){
        validacion.push('Falto el precio');} 
    if (!req.body.usuario){
        validacion.push('Falto el usuario');}       
    if (!req.body.marca){
        validacion.push('Falto la marca ');}
    if (!req.body.estadoEquipo){
        validacion.push('Falto el estado de equipo ');}
    if (!req.body.tipoEquipo){
    validacion.push('Falto el tipo de equipo ');}

    return validacion
}    
module.exports={validarInventario,
}