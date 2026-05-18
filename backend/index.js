const express = require('express'); 
const connectDb = require('./config/db.js');
const cors = require('cors');
const authrouter = require('./routes/api/authroute.js');
const app = express();

app.use(express.json());
app.use(cors());

connectDb();

app.use('/auth', authrouter);

app.listen(3000,()=>{
    console.log('server connected');
});
