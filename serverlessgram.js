exports.teste = async event => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({"teste": "oi"})
    }
    return response
}