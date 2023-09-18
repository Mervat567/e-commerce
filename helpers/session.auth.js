let session=require("express-session");
const { collection } = require("../modules/delivery/delivery.model");
let mongoSessionStrore=require("connect-mongodb-session")(session)


let sessionStore=new mongoSessionStrore({
    uri:process.env.URI,
    collection:"mySessions"
})


sessionStore.on("error",(err)=>{
    console.log(`Mongo Session Store Error`,err)
})


module.exports=session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    store:sessionStore,
    cookie:{secure:false}
})