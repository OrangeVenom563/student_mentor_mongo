const express = require('express')
const cors = require('cors')
const app = express();
const mongoConnect = require('./utils/database').mongoConnect;

app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.send('Hello welcome to student mentor portal')
})

app.use('/student',require('./routes/student'))

app.use('/mentor',require('./routes/mentor'))

app.use(require('./controller/error'));

mongoConnect(()=>{
    app.listen(process.env.PORT||5000,()=>console.log('server running'))
})
