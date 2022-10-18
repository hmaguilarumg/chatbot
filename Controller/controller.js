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
  //console.log(req.body.queryResult.outputContexts[0].parameters['paramname.original']);
  // console.log(responses[0].queryResult.parameters.fields.CodigoEmpleado.numberValue)
  // console.log(responses[0].queryResult.parameters.fields.NumeroSerie.stringValue)
  console.log(responses[0].queryResult.action)
    console.log('----fin---')
    switch   (responses[0].queryResult.action)
    {
        case "Asignar":
         var serie = responses[0].queryResult.parameters.fields.NumeroSerie.stringValue
         var respuesta = await  db.descriptionDesktop(serie)
         if (respuesta != undefined){
          res.send({text: "Se ha encontrado un equipo asignado " + respuesta.descripcion + " actualmente esta  " + respuesta.estado 
        + "\n "  
        + "\nIngrese codigo de empleado del usuario asignar equipo"}) 
         } else {
res.send({text: "No se encontro equipo"})

         }
     //    res.send({text: "Esto es una prueba de asignacion"})
            break;

            
            case "usuario":
 var documento = responses[0].queryResult.parameters.fields.CodigoEmpleado.numberValue
         var respuesta = await  db.cbusuario(documento)
         if (respuesta != undefined){
          res.send({text: "El nombre del usuario es " + respuesta.nombre + " Correo   " + respuesta.email + "Pertenece a la Direccion " + respuesta.direccion + " Puesto: " + respuesta.puesto}) 
         } else {
res.send({text: "No se encontro usuario, valida bien por favor el codigo"})

         }
            break;

            default: 
            res.send({text: result.fulfillmentText})
                    break;     
    }
    
// res.send({text: respuesta})
 
  
}



