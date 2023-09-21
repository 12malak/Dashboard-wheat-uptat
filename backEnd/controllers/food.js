const Food = require("../models/food");

exports.addFood = (req, res, next) => {
  const data = req.body;
  const myNewFood = new Food({
    foodName: data.foodName,
    foodDesc: data.foodDesc,
    foodUrl: data.foodUrl,
  });
  myNewFood.save().catch((err) => console.log(err));
  res.json("create a new food successfully");
};





exports.getAllFoods = (req, res, next) => {
    Food.find({})
      .then(food => {
        res.status(200).json(food);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  };


  exports.getFood = (req, res, next) => {
    const FoodId = req.params.id;
  
    Food.findById(FoodId)
      .then((Food) => {
        if (!Food) {
          return res.status(404).json({ message: 'Food not found' });
        }
        res.status(200).json(Food);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  };
  
  exports.deleteFood = (req, res, next) => {
    const FoodId = req.params.id;
    Food.findOneAndDelete({ _id: FoodId })
      .then(() => {
        res.status(200).json({ message: "Food deleted successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  };
  

  exports.updateFood = async (req, res) => {
    try {
      const FoodId = req.params.id;
      const updatedFoodData = req.body;
  
      // Check if drugUrl field is present and not empty
      if (!updatedFoodData.foodUrl) {
        return res.status(400).json({ error: 'FoodUrl field is required' });
      }
  
      const drug = await Food.findByIdAndUpdate(FoodId, updatedFoodData, { new: true });
      const updatedFood = await drug.save();
      res.json(updatedFood);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };