const User = require('../models/userModel');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

exports.deleteMe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            active: false
        });

        res.status(204).json({
            status: 'success',
            data: null
        });


    } catch (error) {
        next(error);
    }
};

exports.getOne = async (req, res, next) => {
    try {
        const doc = await User.findById(req.params.id);
        console.log(doc)
        if (!doc) {
            res.json({
                status:404,
                message :'no user found with this id'
            })
        }
        res.json({
            status: 'success',
            data: {
                doc
            }
        });
    } catch (error) {
        res.json({
            error :error
        })
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json({
            status: 'success',
            data: users
        });
    } catch (error) {
        res.json({
            error :error
        })
    }

};

exports.createUser = async (req, res, next) => {
    let resBody = '';
    console.log(req.body);
    if(Object.keys(req.body).length == 0) {
        res.json({
            status: 500,
            message: "Empty Obj not allowed"
        });
    } else {
        const newUser = new User({
            name : req.body.name,
            email :req.body.email,
            address : req.body.address,
            password : req.body.password,
            passwordConfirm : req.body.passwordConfirm
        }) 

        newUser.save().then(result =>{
            console.log('USER Created!')
        }).catch(err =>{
           res.json({
               error :err.errors
           })
        })
    }
    
}

exports.updateUser = async (req, res, next) => {
    const updateUser = req.body; 
    User.findById(req.params.id, function (err, foundUser) {
        if(foundUser === null){
            console.log("Book not exists with this id");
        } else {
            User.findByIdAndUpdate(req.params.id,updateUser,{}, (err,user)=>{
                if (err) {
                    return res.status(500).send({error: "Problem with Updating the Employee recored "})
                };
                res.send({success: req.body});
            })
        }
    })
}

exports.loginUser = async (req, res, next) => {
    const userFound = await User.findOne( req.body );
    if(userFound){
        const token = jwt.sign({ sub: userFound.id }, 'amit', { expiresIn: '7d' });
        res.json({
            ...userFound.toJSON(),
            token
        });
    } else {
        res.json({
            status: 404,
            message: "incorrect credential"
       })
    }
}


