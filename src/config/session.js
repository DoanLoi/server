import session from "express-session"
import connectMongo from "connect-mongo";

let MongoStore=connectMongo(session);

let sessionStore=new MongoStore({
  // url:`${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  url: process.env.MONGODB_URI,
  autoReconnect:true,
  // autoRemove:"native"
})


let config=(app)=>{
app.use(session({
  key:"express.sid",
  secret:"mySecret",
  store:sessionStore,
  resave:true,
  saveUninitialized:false,
  cookie:{
    maxAge:1000*60*60*24
  }

}))
};
module.exports={
config:config,
sessionStore:sessionStore

}