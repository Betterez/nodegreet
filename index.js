const express=require('express')
const AWS=require('aws-sdk')
const app=express()
let dynamodb = new AWS.DynamoDB({region:'us-east-1'});
let params={
    TableName: "greetings",
  }
app.get('/',(req,res)=>{
  dynamodb.scan(params,(err,data)=>{
    if(err){
      res.status(500).send(err)
      return
    }
    let ordinal=Math.floor(Math.random()*data.Items.length)
    res.send(`time stamp :${new Date()}<br>
      your ordinal ${ordinal}<br>
      length ${data.Items.length}<br>
      ${data.Items[ordinal].greeting.S}`)
  })
})
app.get('/healthcheck',(req,res)=>res.send("checks ok\r\n"))
app.listen(3000,()=>console.log('sample listening on 3000'))
