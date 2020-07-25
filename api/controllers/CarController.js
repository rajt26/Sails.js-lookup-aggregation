/**
 * CarController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// const Car = require("../models/Car");
// const CarDetails = require("../models/CarDetails");
const db = sails.getDatastore().manager

module.exports = {

    find: async (req, res) => {
        try {
            db.collection('car').aggregate([
                {
                    '$lookup': {
                        'from': 'cardetails', //other table name
                        'localField': 'carDetailsId',//name of car table field
                        'foreignField': '_id',//name of cardetails table field
                        'as': 'cardetails' //alias for cardetails table
                    }
                }, {
                    '$unwind': {
                        'path': '$cardetails'// $unwind used for getting data in object or for one record only
                    }
                }
            ]).toArray((err, result) => {
                res.ok(result)
            })
        } catch (error) {
            res.serverError(error)
        }
    },
    create: async (req, res) => {
        try {
            let { name, price, model, company, engine, color } = req.allParams()
            let carDetails = await CarDetails.create({ model, company, engine, color }).fetch()
            let car = await Car.create({ name, price, carDetailsId: carDetails.id }).fetch()
            res.ok(car)
        } catch (error) {
            console.log(error)
            res.serverError(error)
        }
    },
};
