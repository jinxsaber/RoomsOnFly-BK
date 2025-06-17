const List = require('../model/list');
const mongoose = require('mongoose')


const postList = async (req,res) => {
    const {name, location, host, rate, availability,features,about} = req.body;

    try{
        const data = await List.create({name,location,host,rate,availability,features,about});
        res.status(200).json(data);
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

const getList = async (req,res) => {
    const data = await List.find({})
    res.status(400).json(data);
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