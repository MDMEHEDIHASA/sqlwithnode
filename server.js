const express = require('express')
const app = express()
const dotenv = require('dotenv')
const {notFound,errorHandler} = require('./middlewares/errormiddleware')


dotenv.config()


const userRouter = require('./router/userRouter')
const productRouter = require('./router/productRouter')

app.use(express.json())
app.use('/api/users',userRouter)
app.use('/api/products',productRouter)




app.use(notFound)
app.use(errorHandler)





app.listen(5000,console.log("I am listening to port 5000"))