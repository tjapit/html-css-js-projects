const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {
    registerValidation,
    loginValidation,
} = require("../validation");
const { valid } = require("joi");

/* GET all User in DB */
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(400).send({ message: err });
    }
});

/* GET User by ID */
router.get("/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (err) {
        res.status(400).send({ message: err });
    }
});

/* Register a User to DB */
router.post("/register", async (req, res) => {
    // validate data before creating User
    const { error } = registerValidation(req.body);
    // error checking
    if (error) return res.status(400).send(error.details[0].message);

    // checking if User is already in DB
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
        return res.status(400).send("Email already exists");

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    // try saving to DB
    try {
        const savedUser = await user.save();
        res.send({ user: savedUser.id });
    } catch (err) {
        res.status(400).send({ message: err });
    }
});

/* Login a User */
router.post("/login", async (req, res) => {
    // validate login data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if User exists
    const user = await User.findOne({
        email: req.body.email,
    });
    // User not in DB
    if (!user)
        return res.status(400).send("Incorrect email/password");
    // Checking validity of password
    const validPass = await bcrypt.compare(
        req.body.password,
        user.password
    );
    // Invalid password
    if (!validPass)
        return res.status(400).send("Incorrect email/password");
    // Valid password
    res.send("Logged in!")
});

/* DELETE a User from DB */
router.delete("/:userId", async (req, res) => {
    try {
        const removedUser = await User.findByIdAndDelete(
            req.params.userId
        );
        res.json(removedUser);
    } catch (err) {
        res.status(400).send({ message: err });
    }
});

module.exports = router;
