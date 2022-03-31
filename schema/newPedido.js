const Joi = require('joi')


const schemaNewPedido = Joi.object({
    carrinho: Joi.array().required(),
    endereco: Joi.string().required(),
    totalPedido: Joi.string().required(),
    telefoneCliente: Joi.string().required(),
    nomeCliente: Joi.string().required()
})

module.exports = {
    schemaNewPedido
}