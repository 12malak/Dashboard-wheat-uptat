const Confirmation = require('../models/confirmation');

exports.addConfirmation = (req, res, next) => {
  const data = req.body;
  const { file } = req;


  const myConfirmation = new Confirmation({
    foodName: data.foodName,
    foodDesc: data.foodDesc,
    // foodUrl: data.foodUrl,
    name: data.name,
    phone: data.phone,
    quantity: data.quantity,
    price: data.price,
    userId:data.userId, // use the correct property for the user ID

    foodUrl: (file && file.filename) || null,
    Acceptance: false,
  });

  myConfirmation.save()
    .then(() => res.json('created a new confirmation successfully'))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};




exports.updateRecipes = async (req, res) => {
  try {
    const RecipesId = req.params.id;
    const updatedRecipesData = req.body;
    
      
    // Check if a new image file was uploaded
    if (req.file) {
      updatedRecipesData.foodUrl = req.file.filename;
    }
    
    const Recipe = await Confirmation.findByIdAndUpdate(
      RecipesId,
      updatedRecipesData,
      { new: true }
    );
    const updatedRecipes = await Recipe.save();
    res.json(updatedRecipes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.getAllTrueConfirmationsCard = (req, res, next) => {
  const userId =req.params.id; // convert the id to a mongoose ObjectId 

  Confirmation.find({ Acceptance: true, userId: { $in: userId }})
  .then((Confirmations) => {
    console.log(Confirmations);
    res.status(200).json(Confirmations);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}

exports.getConfirmation = (req, res, next) => {
  const confirmationId = req.params.id;

  Confirmation.findById(confirmationId)
    .then((Confirmations) => {
      if (!Confirmations) {
        return res.status(404).json({ message: 'Confirmation not found' });
      }
      res.status(200).json(Confirmations);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};



exports.getAllFalseConfirmations = (req, res, next) => {
  Confirmation.find({Acceptance: false})
  .then((Confirmations) => {
    res.status(200).json(Confirmations);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}
exports.getAllTrueConfirmations = (req, res, next) => {
  Confirmation.find({Acceptance: true})
  .then((Confirmations) => {
    res.status(200).json(Confirmations);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}





exports.changeToTrue = (req, res, next) => {
  const confirmationId = req.body.id;
  Confirmation.findOneAndUpdate(
    { _id: confirmationId, Acceptance: false }, 
    { Acceptance: true }, 
    { new: true }
  )
  .then((updatedConfirmation) => {
    if (updatedConfirmation) {
      res.status(200).json(updatedConfirmation);
    } else {
      res.status(404).json({ message: "Confirmation not found" });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });
}



exports.deleteConfirmation = (req, res, next) => {
  const confirmationId = req.params.id;
  Confirmation.findOneAndDelete({ _id: confirmationId })
    .then(() => {
      res.status(200).json({ message: "Confirmation deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};



exports.deleteRecipes = async (req, res) => {
  const RecipeId = req.params.id;
   await Confirmation.findByIdAndDelete(RecipeId);
   res.status(204).json(Confirmation);
};
