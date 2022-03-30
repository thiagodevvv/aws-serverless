const { client } = require('./db/config.js')

exports.newPedido = async event => {
    try {
        await client.connect()
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