const express=require('express')
const AWS=require('aws-sdk')
const app=express()
let accessKey=process.env.AWS_SERVICE_KEY;
let secretKey=process.env.AWS_SERVICE_SECRET;
let dynamodb = new AWS.DynamoDB({region:'us-east-1',accessKeyId:accessKey,secretAccessKey:secretKey});
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
    res.send(`<h2>version 0.0.0.8</h2><br>
    time stamp :${new Date()}<br>
      your ordinal ${ordinal}<br>
      length ${data.Items.length}<br>
      ${data.Items[ordinal].greeting.S}
      `)
  })
})
app.get('/healthcheck',(req,res)=>res.send("checks ok\r\n"))
app.listen(3000,()=>console.log('sample listening on 3000'))
