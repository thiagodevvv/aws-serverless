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



exports.addContato = async event => {
	try {
		await client.connect()
		const dbgram = await client.db('dbgram')
		const response = await dbgram.collection('contatos').findOne({ telefoneCliente: event.body.telefoneCliente })
		if(!response) {
            await dbgram.collection('contatos').insertOne(JSON.parse(event.body))
            return {
                statusCode: 200,
                body: JSON.stringify({msg: 'Contato adicionado com sucesso'})
            }
        }
        else
            return {
                statusCode: 200,
                body: JSON.stringify({msg: 'Contato já existente'})
            }
	}catch(err) {
		console.log(err)
		return {
			statusCode: 500,
            body: JSON.stringify({msg: err})
		}
	}
}
