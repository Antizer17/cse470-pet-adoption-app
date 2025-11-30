const Food = require("../models/Food");

exports.getAllFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).json(foods);
    } catch (err) {
        res.status(500).json({ message: "Error fetching foods" });
    }
};
