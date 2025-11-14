let express = require('express');
const { EnquiryInsert, ViewData, DeleteData, UpdateData } = require('../../Controller/Web/UserEnquiryController');
let Enquiryrouters = express.Router();


Enquiryrouters.post('/insert', EnquiryInsert);
Enquiryrouters.get('/view', ViewData);
Enquiryrouters.delete('/delete/:id', DeleteData);
Enquiryrouters.put('/update/:id', UpdateData);  

module.exports = Enquiryrouters;