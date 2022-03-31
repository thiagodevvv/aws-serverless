function setResponse(statusCode, msg) {
	return {
		statusCode: statusCode,
		body: JSON.stringify(msg)
	}
}


module.exports = { setResponse } 
