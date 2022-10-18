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


 module.exports = {

  descriptionDesktop,
  cbusuario
 }