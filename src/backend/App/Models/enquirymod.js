let mongoose = require('mongoose');

var userenquirymod = new mongoose.Schema({
    name: { type: String },
    email: { type: String},
    phone: { type: Number },
    message: { type: String }
});

var enquirymod = mongoose.model('enquiry', userenquirymod);

module.exports = enquirymod;
