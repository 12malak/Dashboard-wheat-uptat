const Drug = require("../models/drug");

exports.addDrug = (req, res, next) => {
  const data = req.body;
  const myNewDrug = new Drug({
    drugName: data.drugName,
    drugDesc: data.drugDesc,
    drugUrl: data.drugUrl,
  
  });
  myNewDrug.save().catch((err) => console.log(err));
  res.json("create a new drug successfully");
};

exports.getAllDrugs = (req, res, next) => {
  Drug.find({})
    .then((drugs) => {
      res.status(200).json(drugs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};




exports.deleteDrug = (req, res, next) => {
  const DrugId = req.params.id;
   Drug.findByIdAndDelete({ _id: DrugId })
   .then(() => {
    res.status(200).json({ message: "Drug deleted successfully" });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ error: err });
  });
};

exports.getDrug = (req, res, next) => {
  const DrugsId = req.params.id;

  Drug.findById(DrugsId)
    .then((Drug) => {
      if (!Drug) {
        return res.status(404).json({ message: 'Drug not found' });
      }
      res.status(200).json(Drug);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};



exports.updateDrug = async (req, res) => {
  try {
    const DrugId = req.params.id;
    const updatedDrugData = req.body;

    // Check if drugUrl field is present and not empty
    if (!updatedDrugData.drugUrl) {
      return res.status(400).json({ error: 'drugUrl field is required' });
    }

    const drug = await Drug.findByIdAndUpdate(DrugId, updatedDrugData, { new: true });
    const updatedDrug = await drug.save();
    res.json(updatedDrug);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};