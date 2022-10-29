module.exports = {
    sendToIA
}


const dialogflow = require('@google-cloud/dialogflow');
const { response } = require('express');
const uuid = require('uuid');
const db = require('../Mysql/demo_db_conexion')


async function sendToIA(req, res){
    
    console.log(req.body)
    projectId = 'soporte-wbki'
    const sessionId = uuid.v4();
    if (req.body.channel !== undefined){
      responsePusher = await services.postPusher(req.body);
    }

  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  if (req.body.channel === undefined){
    mensaje =  req.body.message.text
  }else{
    mensaje = req.body.message
  }



  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        //text: req.body.message.text, estructura googlechat
        text: mensaje,
        languageCode: 'es',
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log('  No intent matched.');
  }
 
  console.log(result.fulfillmentText)
  console.log('----inicio---')
 // console.log(req.body.queryResult.outputContexts[0].parameters['paramname.original']);
  // console.log(responses[0].queryResult.parameters.fields.CodigoEmpleado.numberValue)
  // console.log(responses[0].queryResult.parameters.fields.NumeroSerie.stringValue)
  console.log(responses[0].queryResult.action)
  console.log(responses[0].queryResult.fulfillmentText)
    console.log('----fin---')
    switch   (responses[0].queryResult.action)
    {
        case "Asignar":
         var serie = responses[0].queryResult.parameters.fields.NumeroSerie.stringValue
         var respuesta = await  db.descriptionDesktop(serie)
         if (respuesta != undefined){
          if (respuesta.estado === 'Disponible') {
          res.send({text: "Se ha encontrado un equipo  " + respuesta.descripcion + " actualmente esta  " + respuesta.estado + " id " + respuesta.id
        }) 
         }
         else {
                    
          res.send({text: "La serie ingresada corresponde a:  " + respuesta.descripcion +  " estado " + respuesta.estado + "\n" +  " Si deseas asignar un equipo revisa que este disponible"})
         }
          
         } else {
res.send({text: "No se encontro equipo"})

         }
     //    res.send({text: "Esto es una prueba de asignacion"})
            break;

            
             case "datos":
  var documento = responses[0].queryResult.parameters.fields.CodigoEmpleado.numberValue
          var respuesta = await  db.cbusuario(documento)
          if (respuesta != undefined){
           res.send({text: "El nombre del usuario es " + respuesta.nombre + " id " + respuesta.id + "\n " 
           + "Correo   " + respuesta.email +  "\n"
           + "Pertenece a la Direccion " + respuesta.direccion + " Puesto: " + respuesta.puesto}) 
          } else {
 res.send({text: "No se encontro usuario, valida bien por favor el codigo"})

          }
             break;



            case "usuario":
              var documento = responses[0].queryResult.parameters.fields.CodigoEmpleado.numberValue
                      var respuesta = await  db.equiposusuario(documento)
                      console.log("esto es un identificador")
                      console.log(respuesta)
                      if (respuesta != undefined){
                        const listDes = []
                        let index = 0
                        respuesta.forEach(element => {
                          index += 1
                          listDes.push(index +  ". " + element.descripcion + " Serie: "  + element.codigo +  " \n")
                         });   
                     //   res.send({text: "Actualmente  " + respuesta[0].nombre + " con puesto: " + respuesta[1].puesto + " de la direccion  " + respuesta[2].direccion +  "\n"  + "\n" + " Tiene asignado los siguientes equipos   "
                     res.send({text: "Actualmente  " + respuesta[0].nombre +  "\n"  + "\n" + " Tiene asignado los siguientes equipos   " 
                     + "\n "  
                           + listDes.toString().replaceAll(',' , '') }) 

                      } else {
             res.send({text: "No se encontro usuario, valida bien por favor el codigo"})
             
                      }
                         break;


            case "recuperar":
              var serie = responses[0].queryResult.parameters.fields.NumeroSerie2.stringValue
                      var respuesta = await  db.recuperar(serie)
                      console.log("esto es consolo")
                      console.log(respuesta.affectedRows)
                      if (respuesta.affectedRows !== 0){
                       res.send({text: "Se recupero el equipo"}) 
                      } else {
             res.send({text: "No se encontro equipo asignado para recuperar"})
            
                      }
                         break;



                         case "insertar":
                          var serie = responses[0].queryResult.parameters.fields.CodSerie.numberValue
                          var codigos = responses[0].queryResult.parameters.fields.IdCod.numberValue
                          console.log("response: ", responses[0].queryResult.parameters.fields)
                          console.log("response: ", responses[0].queryResult.parameters.fields)
                                  var respuesta = await  db.insertar(codigos,serie)
                                  if (respuesta != undefined){
                                   res.send({text: "Se inserto el equipo"}) 
                                  } else {
                         res.send({text: "No se encontro serie"})
                        
                                  }
                                     break;




                                     case "problema":
                                      var problemas = responses[0].queryResult.parameters.fields.Proble.stringValue
                                              var respuesta = await  db.soporteit(problemas)
                                              if (respuesta != undefined){
                                               res.send({text: "Por favor sigue los pasos que te detallo a continuación " + "\n" 
                                               + "\n" +   respuesta.solucion + "\n" + "\n" + "Responde si lograste resolver tu inquietud"}) 
                                              } else {
                                     res.send({text: "Se asigno equipo,se envio por correo hoja asigncion"})
                                    
                                              }
                                                 break;
                                    

                                                 case "solucion":
                                                  var solucion = responses[0].queryResult.parameters.fields.Solucion.stringValue
                                                          var respuesta = await  db.solucionbd(solucion)
                                                          if (respuesta != undefined){
                                                           res.send({text: respuesta.positivo}) 
                                                          } else {
                                                 res.send({text: "Fue un placer servirte"})
                                                
                                                          }
                                                             break;


                                                             case "NoFunciono":
                                                              var nosolucion = responses[0].queryResult.parameters.fields.Negativo.stringValue
                                                                      var respuesta = await  db.nosolucionbd(nosolucion)
                                                                      if (respuesta != undefined){
                                                                       res.send({text: respuesta.negativo}) 
                                                                      } else {
                                                             res.send({text: "Mejorare para poder ayudarte una proxima vez"})
                                                            
                                                                      }
                                                                         break;
     

            default: 
            res.send({text: result.fulfillmentText})
                    break;     
    }
    



    
// res.send({text: respuesta})
 
  
}



