const Voting = require('../models/votingModel');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

exports.getAll = async (req, res, next) => {
    try {
        const voting = await Voting.find();
        res.json({
            status: 'success',
            data: voting
        });
    } catch (error) {
        res.json({
            error :error
        })
    }

};

exports.createVoting = async (req, res, next) => {

    console.log(req.body);
    if(Object.keys(req.body).length == 0) {
        res.json({
            status: 500,
            message: "Empty Obj not allowed"
        });
    } else {
        const newVoting = new Voting({
            name : req.body.name,
            email :req.body.votingOption,
        }) 

        newVoting.save().then(result =>{
            console.log('Voting Created!')
        }).catch(err =>{
           res.json({
               error :err.errors
           })
        })
    }
    
}