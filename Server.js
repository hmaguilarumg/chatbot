'use strict'
var express = require('express')
var bodyparser = require('body-parser')
var log4js = require('log4js')

var app = express()
 var routes = require('./Routes/routes')

log4js.configure({
  appenders:{
    console:{
      type: 'console'
    }
  },categories:{
    default:{
      appenders:['console'],
      level:'info'
    }
  }
})

try{
var logger = log4js.getLogger('Soporte')
app.use(bodyparser.json())
app.use(log4js.connectLogger(logger,{
  level: 'info'
}))
 routes.assignRoutes(app)
app.listen(3000,() =>{
  logger.info('Funciona en puerto 3000')
})
}catch(error){
logger.error('No funciona')
}