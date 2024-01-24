require('dotenv').config()
require('express-async-errors')
//async errors

const express = require('express')
const app = express()

const connectDB = require('./db/connect.js')
const productsRouter = require('./routes/products.js')

const notFoundMiddleware = require('./middleware/not-found.js')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())

//routes
app.get('/', (req,res)=>{
    res.send('<h1>Store API</h1> <a href="/api/v1/products">Products route</a>')
})

app.use('/api/v1/products',productsRouter)

//products route
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000
const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server is listening to port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()