const {MongoClient} = require('mongodb')

const url = `mongodb+srv://app-master:${process.env.DB_PASS}@cluster0.7gdhq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(url)


module.exports =  {
    client
}