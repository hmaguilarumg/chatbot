const log4js = require('log4js')
const logger = log4js.getLogger('Soporte')
const controller = require('../Controller/controller')


exports.assignRoutes = function(app){
    app.get('/',function(req,res){
        
        res.send('Funciona')
    })

    app.post('/services/',function(req,res){
        controller.sendToIA(req,res)
    })
}