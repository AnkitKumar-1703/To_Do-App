const express = require('express');
const userRouter = require('./routes/user');
const todoRouter = require('./routes/todo');
const app = express()
const port = 3000
const cors = require("cors");

app.use(cors())
app.use(express.json());
app.use('/user',userRouter)
app.use('/todo',todoRouter)

app.get('/test',(req,res)=>{
    res.status(200).json({
        "message":"App is working"
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})