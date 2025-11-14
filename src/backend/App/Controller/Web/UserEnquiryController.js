const DataModel = require('../../Models/enquirymod');

let EnquiryInsert = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const newData = new DataModel({
      name,
      email,
      phone,
      message
    });

    const savedData = await newData.save();

    res.status(200).json({
      success: true,
      name,
      email,
      phone,
      message,
      data: savedData
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error saving data",
      error: err.message
    });
  }
};



let ViewData =  async (req,res)=>{
        let data = await DataModel.find();
        res.send(data);

    }

let DeleteData  = async (req,res)=>{
    let id = req.params.id;
    let deleteData = await DataModel.deleteOne({_id: id});
    res.send(id, { delRes: deleteData });
}

let UpdateData = async (req,res)=>{
    let id = req.params.id;
    let { name, email, phone, message } = req.body;
    let updateObj = {
        name: name,
        email: email,
        phone: phone,
        message : message 
    };

    let updateData = await DataModel.updateOne({_id: id}, updateObj);
    
        res.send("Data Updated", updateData);
    }

module.exports = {EnquiryInsert, ViewData, DeleteData, UpdateData};