const { client } = require('./db/config.js')
const { schemaNewPedido } = require('./schema/newPedido.js')
const { setResponse } = require('./setResponse.js')
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
        return setResponse(200,{msg: 'Pedido enviado com sucesso'}) 

    }catch (err) {
        console.log(err)
        return setResponse(500,{msg: err}) 
    }
}



exports.addContato = async event => {
	try {
		await client.connect()
		console.log(event.body.telefoneCliente)
		const dbgram = await client.db('dbgram')
		const paramsParse = JSON.parse(event.body)
		const response = await dbgram.collection('contatos').findOne({ telefoneCliente: `${paramsParse.telefoneCliente}` })
		console.log(response)
		if(!response) {
           		await dbgram.collection('contatos').insertOne(JSON.parse(event.body))
            		return setResponse(200, {msg: 'Contato adicionado com sucesso'})       		 }
       		 else 
			return setResponse(200,{msg:'Contato já existente'})

	}catch(err) {
		console.log(err)
		return setRespose(500, {msg: err})
	}
}
