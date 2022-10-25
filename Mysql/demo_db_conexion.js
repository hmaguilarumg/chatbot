const { response } = require('express');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'sis_inventario2'
});





 function descriptionDesktop(serie){
  console.log("si entro a descriptionDesktop con serie  " + serie)
  return new Promise((resolve, reject) =>{
     connection.query(
// "SELECT p.descripcion, s.estado FROM `productos` p join `estados` s on s.id_estado= p.id_estado WHERE p.codigo = 'ABC123'",
       "SELECT p.descripcion, s.estado FROM `productos` p join `estados` s on s.id_estado= p.id_estado WHERE p.codigo = ?",
     [serie], (err, result) => {
        return err ? reject(err) : resolve(result[0])
        
      }

   )
  
  })
 }


 function recuperar(serie){
  console.log("si   " + serie)
  return new Promise((resolve, reject) =>{
     connection.query(
   "DELETE control FROM   control  JOIN productos ON productos.id = control.id_producto WHERE productos.codigo = ?",
     [serie], (err, result) => {
     if (err){
reject(err);

     }
     else {
resolve(result);

     }
      // console.log(result)
      // console.log(err)
      // console.log(reject(err))
      // console.log(resolve(result))
      //   return err ? reject(err) : resolve(result)
        
      }

   )
  
  })
 }


 function cbusuario(documento){
  console.log("si codigo  " + documento)
  return new Promise((resolve, reject) =>{
     connection.query(
   //    "SELECT p.descripcion, s.estado FROM `productos` p join `estados` s on s.id_estado= p.id_estado WHERE p.codigo = ?",
          "select nombre, email, direccion, puesto from `clientes` WHERE `clientes`.`documento` = ?",
     [documento], (err, result) => {
        return err ? reject(err) : resolve(result[0])
        
      }

   )
  
  })
 }



 function equiposusuario(documento){
   console.log("si   " + documento)
   return new Promise((resolve, reject) =>{
      connection.query(
    //    "SELECT p.descripcion, s.estado FROM `productos` p join `estados` s on s.id_estado= p.id_estado WHERE p.codigo = ?",
    " select productos.descripcion,  clientes.nombre from control join productos on productos.id = control.id_producto join estados on estados.id_estado = productos.id_estado join clientes on clientes.id = control.id_cliente where clientes.documento = ?",
         //  "select nombre, email, direccion, puesto from `clientes` WHERE `clientes`.`documento` = ?",
      [documento], (err, result) => {
         return err ? reject(err) : resolve(result[0])
         
       }
 
    )
   
   })
  }



 




    function insertar(serie, documento){
    console.log("si   " + documento)
    console.log("si   " + serie)
  return new Promise((resolve, reject) =>{
      connection.query(
      "select nombre, email, direccion, puesto from `clientes` WHERE `clientes`.`documento` = ?",
       [documento], (err, result) => {
         return err ? reject(err) : resolve(result[0])
         
       }
      )
   
    })
   }






 module.exports = {

  descriptionDesktop,
  cbusuario,
  equiposusuario,
  recuperar,
  insertar
 }