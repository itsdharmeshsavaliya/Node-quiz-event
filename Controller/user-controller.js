const { create, userList, userById, updateUser, getUserByEmail, subscriptionDetail, subscription } = require("../Services/users-service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
module.exports = {
    registration: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Successfully Registered",
                data: results
            })
        });
    },

    getUser: (req, res) => {
        console.log(req.body.role)
        userList((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "user list not found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "successful",
                data: results
            })
        });

    },

    userById: (req, res) => {
        const body = req.params;
        userById(body, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "user list not found"
                });
            }
            result.password = undefined;
            return res.status(200).json({
                suuccess: 1,
                message: "User data here",
                data: result
            });

        });
    },
    updateUser: (req, res) => {
        const body = req.body;
        updateUser(body, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "user list not found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "User data updated",
                data: result
            });
        });

    },
    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body, (err, results) => {
            if (err) {
                return res.status(203).json({
                    success: 0,
                    message: "user list not found"
                });
            }
            if (!results) {
                return res.status(203).json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, 'pawan', {
                    expiresIn: "2400h"
                });
                return res.status(200).json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken,
                    data: results
                })
            } else {
                return res.status(203).json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        });
    },
    subscription: (req, res) => {
        const body = req.body;
        subscription(body, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "unable to subscribe"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Subscribe Successfully",
                data: result
            });
        });

    },
    subscriptionDetail: (req, res) => {
        const body = req.body;
        subscriptionDetail(body, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "list not found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Subscription is here",
                data: result
            });
        });

    },
}