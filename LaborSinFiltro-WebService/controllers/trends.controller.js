const Trends = require('../models/tag.model')

const controller = {};

controller.findsimilar = async (req,res,next) => {
    try {
        const trends = Trends.aggregate([
            { $sortByCount: '$tag' }   
        ]);

        return res.status(201).json(trends)

      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "internal service error"});
      }
}

controller.findall = async (req,res,next) => {
    try {
        const trends = await Trends.find({})

        return res.status(201).json(trends)

      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "internal service error"});
      }
}

module.exports= controller