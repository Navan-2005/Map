const express=require('express')
const path=require('path')
const http=require('http')
const app=express()
const server=http.createServer(app)
 const socket=require('socket.io')
 const io=socket(server)
 
 app.set('view engine','ejs')
 app.use(express.static(path.join(__dirname,'public')))

io.on('connection',function(socket){
    socket.on('send-location',function(data){
        io.emit('receive-location',{id:socket.id,...data})
    })
    socket.on('diconnect',function (){
        io.emit('user-disconnected',socket.id)
    })
    console.log('connected');
    
})
 app.get('/',(req,res)=>{
    res.render('index')
 })

 

 server.listen(3000,()=>{
    console.log('connected to server');
    
 })