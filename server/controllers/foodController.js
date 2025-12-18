const Food = require("../models/Food");

exports.getAllFoods = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = {};
    if (category && category !== "all") {
      filter.category = category;
    }

    const foods = await Food.find(filter);
    res.status(200).json(foods);
  } catch (err) {
    res.status(500).json({ message: "Error fetching foods" });
  }
};
