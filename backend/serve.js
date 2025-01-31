import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/connectDB.js'
import usersRouter from './router/users.router.js'
import productsRouter from './router/products.router.js'
import categoriesRouter from './router/categories.route.js'
import reviewsRouter from './router/reviews.router.js'
import ordersRouter from './router/orders.router.js'
import agesRouter from './router/ages.router.js'
import cartRouter from './router/cart.routes.js'
import stripeRouter from './router/stripe.router.js'

dotenv.config()

const PORT = process.env.PORT || 7000
const app = express()

app.use(express.json()) 
app.use(cors())

app.use('/api/auth',usersRouter)
app.use('/api/products',productsRouter)
app.use('/api/categories',categoriesRouter)
app.use('/api/ages',agesRouter)
app.use('/api/orders',ordersRouter)
app.use('/api/reviews',reviewsRouter)
app.use('/api/cart',cartRouter)
app.use('/api/payment', stripeRouter)


app.listen(PORT , () => {
    connectDB()
    console.log(`Server run at http://localhost:${PORT}`);
})
