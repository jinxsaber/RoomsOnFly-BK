const List = require('../model/list');
const mongoose = require('mongoose')


const postList = async (req, res) => {
  try {
    const {
      name,
      location,
      rating,
      reviews,
      price_per_night,
      details,
      host,
      description,
      images
    } = req.body;

    const newList = await List.create({
      name,
      location,
      rating,
      reviews,
      price_per_night,
      details: {
        guests: details.guests,
        bedrooms: details.bedrooms,
        bathrooms: details.bathrooms,
        dedicated_workspace: details.dedicated_workspace,
        self_checkin: details.self_checkin,
        free_cancellation: details.free_cancellation
      },
      host: {
        name: host.name,
        joined: host.joined
      },
      description,
      images
    });

    res.status(200).json(newList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getList = async (req,res) => {
    const data = await List.find({})
    res.status(200).json(data);
}

const getOne = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json('Nothing Here');
    }

    const data = await List.findById(id);

    if(!data){
        return res.status(404).json('NOt Found')
    }
    res.status(200).json(data);
}


module.exports = {
    getList,
    getOne,
    postList
}