//require("dotenv").config();
var jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();




//authentication
exports.loginRequired = function (req, res, next) {
    try {
        console.log(`Your secret key is ${process.env.SECRET_KEY}`);
        console.log(req.headers.authorization);
        const token = req.headers.authorization.split(" ")[1]; //read token from the header
        console.log("inside loginRequired " + token);
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) { //decode the token using secret key
            if (decoded) { //decoded contains actual payload, and if it exists go to next
                console.log("inside loginRequired");
                next();
            } else {
                console.log("inside loginRequired error");
                return next({
                    status: 401,
                    message: "Please Log In First"
                });
            }
        });
    } catch (err) {
        console.log("inside loginRequired catch no token");
        return next({
            status: 401,
            message: "Please Log In First"
        });
    }
};

//authorization
exports.ensureCorrectUser = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            console.log("inside ensureCorrectUser params " + req.params.userId);
            if (decoded && decoded._id === req.params.userId) {
                console.log("inside ensureCorrectUser");
                return next();
            } else {
                console.log("inside ensureCorrectUser error " + decoded._id + " " + req.params.userId);
                return next({
                    status: 401,
                    message: "Unauthorized"
                });
            }
        });
    } catch (err) {
        return next({
            status: 401,
            message: "Unauthorized"
        });
    }
};