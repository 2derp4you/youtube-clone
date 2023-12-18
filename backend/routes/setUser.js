const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const dotenv = require('dotenv');

dotenv.config();

const saltRounds = 10;

router.post('/register', async (req, res) => {
    let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        Oauth: null,
    });

    try {
        const user = await newUser.save();

        const accessToken = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            Oauth: user.Oauth,
            createdAt: user.createdAt,
        }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({
            user: user,
            accessToken,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/fallback', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: "heyThereSexy",
        email: req.body.email,
        Oauth: req.body.Oauth,
    });

    try {
        const user = await newUser.save();

        const accessToken = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            Oauth: user.Oauth,
            createdAt: user.createdAt,
        }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({
            user: user,
            accessToken,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/fallback/:email/:username/:Oauth', async (req, res) => {
    try {
        const user = await User.find({ email: req.params.email, username: req.params.username, Oauth: req.params.Oauth });
        if(!user) {
            res.status(404).json('User not found!');
        }
        const accessToken = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            Oauth: user.Oauth,
            createdAt: user.createdAt,
        }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({
            user: user,
            accessToken,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login/:email/:pass', async (req, res) => {
    try {
        let user = await User.find({ email: req.params.email });
        if(!user) {
            res.status(404).json('User not found!');
        }
        if(user[0].Oauth !== null) {
            res.status(400).json('Please login with HC-Auth!');
        }
        bcrypt.compare(req.params.pass, user[0].password, (err, result) => {
            if(err) {
                res.status(500).json(err);
            } else {
                if(result) {
                    const { password, ...others } = user[0]._doc;

                    const accessToken = jwt.sign({
                        id: user[0]._id,
                        username: user[0].username,
                        email: user[0].email,
                        isAdmin: user[0].isAdmin,
                        Oauth: user[0].Oauth,
                        createdAt: user[0].createdAt,
                    }, process.env.JWT_SECRET, { expiresIn: '7d' });

                    res.status(200).json({
                        user: others,
                        accessToken,
                    });
                } else {
                    res.status(400).json('Wrong password!');
                }
            }
        });
    } catch (err) {
        res.status(500).json("no func");
    }
});

router.get('/all', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/admin", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body.id, {
            isAdmin: req.body.isAdmin,
        });
        res.status(200).json("The user has been updated!");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;