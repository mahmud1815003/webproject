//External Imports
const bcrypt = require('bcrypt');
const path = require('path');
const { unlink } = require('fs');

//Internal Imports
const People = require('../Models/People');

const getAdmin = async (req, res, next) => {
    try {
        const userData = await People.find();
        res.locals.users = userData;
        res.render("admin");
    } catch (err) {
        console.log(err);
        next("Database Error");
    }
}

const addUser = async (req, res, next) => {
    let newUser;
    const hashedPassword = bcrypt.hash(req.body.password, 15);
    if (req.files && req.files.length > 0) {
        newUser = new People({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashedPassword,
            role: req.body.role.toLowerCase().trim(),
        });

    } else {
        newUser = new People({
            ...req.body,
            password: hashedPassword,
            role: req.body.role.toLowerCase().trim(),
        })
    }
    try {
        const result = await newUser.save();
        res.status(200).json({
            message: "User added Successfully",
        });
    } catch (error) {
        console.log(error.message);
        res.json({
            errors: {
                common: error.message,
            }
        })
    }
}

const deletUser = async (req, res, next) => {
    try {
        const userData = await People.findByIdAndDelete({ _id: req.params._id });
        if (userData.avatar) {
            unlink(path.join(__dirname, '../Public/uploads/avater', `${userData.avatar}`),
                (err) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({
                            error: {
                                msg: "There was a problem in Deleting Error",
                            }
                        });
                    } else {
                        res.status(200).json({
                            data: {
                                msg: "User Deleted Successfully",
                            }
                        });
                    }
                });
        } else {
            res.status(200).json({
                data: {
                    msg: "User Deleted Successfully",
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: {
                msg: "There was a problem in Deleting Error",
            }
        });
    }
}


module.exports = {
    getAdmin,
    addUser,
    deletUser,
}