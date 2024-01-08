const express = require('express');
const user = require('../controllers/user');
const auth = require('../controllers/auth');
const passport = require('passport');
const { isAdminAuthenticate, isAuthenticate } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(user.alerts);

router.get("/", passport.authenticate('jwt', { session: false }), isAdminAuthenticate, user.usersList)

router.get("/:id", passport.authenticate('jwt', { session: false }), isAuthenticate, user.singleUser)

router.post("/signup", auth.signup)

router.post("/login", auth.login)

router.get('/logout', auth.logout);


module.exports = router;