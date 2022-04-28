const User = require('../models/userModel');


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

        if (!doc) {
            return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        }

        res.status(200).json({
            status: 'success',
            data: {
                doc
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const features = User.find()

        const doc = await features.query;

        res.status(200).json({
            status: 'success',
           
            data: {
                data: doc
            }
        });

    } catch (error) {
        next(error);
    }

};


