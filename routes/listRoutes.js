const express = require('express')

const {getList,getOne,postList} = require('../controllers/listController')

const routerList = express.Router();

routerList.get('/listings',getList);

routerList.post('/listings',postList)

routerList.get('/listings/:id',getOne);



module.exports = routerList;