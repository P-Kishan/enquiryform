let express = require('express');   
let cors = require('cors');
let mongoose = require('mongoose');
let Enquiryrouters  = require('./App/Routes/Web/EnquiryRoutes');
require('dotenv').config();

let app = express();
app.use(cors());

app.use(express.json());

//api 
app.use('/api/enquiry', Enquiryrouters);

//DB Connection
mongoose.connect(process.env.DBurl)
    .then(()=>{
    console.log("Connected to DB");
    app.listen(process.env.PORT)
})