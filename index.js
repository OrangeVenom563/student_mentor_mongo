const express = require('express')
const cors = require('cors')
const app = express();

app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.send('Hello from express')
})

app.use('/student',require('./routes/student'))

app.use('/mentor',require('./routes/mentor'))

app.use(require('./controller/error'));

app.listen(process.env.PORT||5000,()=>console.log('server running'))