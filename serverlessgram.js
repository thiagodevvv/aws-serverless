const { client } = require('./db/config.js')
const { schemaNewPedido } = require('./schema/newPedido.js')

exports.newPedido = async event => {
    try {
        await client.connect()
        const requestPedido = JSON.parse(event.body)
        const schema = schemaNewPedido.validate(requestPedido)
        requestPedido.status = 0
        if(schema.error) {
            return {
                statusCode: 400,
                body: JSON.stringify({msg: schema.error})
            }
        }
        const dbgram = await client.db('dbgram')
        await dbgram.collection('pedidos').insertOne(requestPedido)
        return {
            statusCode: 200,
            body: JSON.stringify({msg: 'Pedido adicionado com sucesso.'})
        }
    }catch (err) {
        console.log(err)
        return {
            statusCode: 500,
            body: JSON.stringify({msg: err})
        }
    }
}