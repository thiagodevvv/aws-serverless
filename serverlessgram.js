const { client } = require('./db/config.js')
const { schemaNewPedido } = require('./schema/newPedido.js')

exports.newPedido = async event => {
    try {
        await client.connect()
        const schema = schemaNewPedido.validate(JSON.parse(event.body))
        if(schema.error) {
            return {
                statusCode: 400,
                body: JSON.stringify({msg: schema.error})
            }
        }
        const dbgram = await client.db('dbgram')
        await dbgram.collection('pedidos').insertOne({pedido: ['X Salada']})
        return {
            statusCode: 200,
            body: JSON.stringify({msg: 'Conectou no banco'})
        }
    }catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({msg: 'erro ao se conectar ao banco'})
        }
    }
}