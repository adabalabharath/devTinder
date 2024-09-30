let express=require('express')

let app=express()

app.get('/',(req,res)=>{
    res.send('default')
})
app.get('/test',(req,res)=>{
    res.send('test-route')
})
app.get('/hello',(req,res)=>{
    res.send('hello-route')
})

app.listen(7777,()=>{
    console.log('listening port 7777')
})