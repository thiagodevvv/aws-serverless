const Joi = require('joi')


const schemaNewPedido = Joi.object({
    pedido: Joi.array(),
    endereco: Joi.string(),
    totalPedido: Joi.string()
})

module.exports = {
    schemaNewPedido
}