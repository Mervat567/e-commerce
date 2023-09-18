const express=require("express")
const app=express()
const cors=require("cors")
require("dotenv").config()
const connection=require('./database').connection
connection()


const userRoutes=require("../routes/user/user.route")
const cartRoutes=require("../routes/cart/cart.route")
const orderRoutes=require("../routes/orders/order.route")
const productRoutes=require("../routes/products/product.route")
const reviewRoutes=require("../routes/review/review.route")
const vendorRoutes=require("../routes/vendor/vendor.route")
const deliveryRoutes=require("../routes/delivery/delivery.route")
const wishlistRoutes=require("../routes/wishlist/wishlist.route")
const uploadRoutes=require("../routes/products/upload.route")
const{handleFileUploadErrors}=require("../helpers/uploader.helper")
const sessionAuth=require("../helpers/session.auth")
const{handleCorsPolicy}=require("../helpers/cors")



app.use(cors())
app.use(handleCorsPolicy)
app.use(express.json())
app.use(handleFileUploadErrors)
app.use(userRoutes)
app.use(cartRoutes)
app.use(orderRoutes)
app.use(productRoutes)
app.use(reviewRoutes)
app.use(vendorRoutes)
app.use(deliveryRoutes)
app.use(wishlistRoutes)
app.use(uploadRoutes)
app.use(sessionAuth)


module.exports=app