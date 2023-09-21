const Payment = require('../models/Payment');


exports.addPayment = (req, res, next) => {
    const data = req.body;
 console.log(data);
   const myInquiryPayment = new Payment({
    UserName: data.UserName,
    Governorate: data.Governorate,
    phoneNumber: data.phoneNumber,

    address: data.address,
   
   });
 
   myInquiryPayment
     .save()
     .catch((err) => console.log(err));
    res.json("create a new inquiry Payment successfully");
 };
 


// this shoud delete it later 
 exports.getAllPayment = (req, res, next) => {
    // Payments.find({donationType:"Others"})
    Payment.find({})
  .then((Payment) => {
    res.status(200).json(Payment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
 }
 exports.deleteOrders = (req, res, next) => {
  const OrdersId = req.params.id;
  Payment.findByIdAndDelete({ _id: OrdersId })
   .then(() => {
    res.status(200).json({ message: "Orders deleted successfully" });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ error: err });
  });
};