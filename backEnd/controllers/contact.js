const Contact = require('../models/contact');


exports.addContact = (req, res, next) => {
    const data = req.body;
 console.log(data);
   const myInquiry = new Contact({
    patientName: data.patientName,
    patientGmail: data.patientGmail,
    phoneNumber: data.phoneNumber,
    patientMsg: data.patientMsg
   });
 
   myInquiry
     .save()
     .catch((err) => console.log(err));
    res.json("create a new inquiry successfully");
 };
 


// this shoud delete it later 
 exports.getAllContacts = (req, res, next) => {
  Contact.find({})
  .then((contacts) => {
    res.status(200).json(contacts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
 }
 exports.deleteContact = (req, res, next) => {
  const ContactId = req.params.id;
  Contact.findByIdAndDelete({ _id: ContactId })
   .then(() => {
    res.status(200).json({ message: "Contact deleted successfully" });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ error: err });
  });
};




exports.ViewContact = (req, res, next) => {
  const ContactId = req.params.id;

  Contact.findById(ContactId)
    .then((Contact) => {
      if (!Contact) {
        return res.status(404).json({ message: 'contact not found' });
      }
      res.status(200).json(Contact);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};