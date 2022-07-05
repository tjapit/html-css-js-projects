const router = require("express").Router();
const User = require("../models/User");
const { registerValidation } = require("../validation");

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

/* POST a User to DB */
router.post("/register", async (req, res) => {
    // validate data before creating User
    const { error } = registerValidation(req.body);
    // error checking
    if (error) return res.status(400).send(error.details[0].message);

    // checking if User is already in DB
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
        return res.status(400).send("Email already exists");

    // create new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    // try saving to DB
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send({ message: err });
    }
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
