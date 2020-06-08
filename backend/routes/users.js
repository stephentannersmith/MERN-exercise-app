// Import router functionality
const router = require('express').Router();
// Declare users model as User
let User = require('../models/user.model')

// Set root route 'localhost:3000/users/ to get all users and display in JSON object
router.route('/').get((req, res) => {
    // .find is a mongoose method that gets list of all users from DB and returns a promise, then gets all users in JSON format, if error it will catch and return 400 with error msg.
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User ({username});

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;