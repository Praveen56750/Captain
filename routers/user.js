const express = require('express');
const user = require('../controllers/user');
const auth = require('../controllers/auth');
const passport = require('passport');
const { isAdmin, isUserOrAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(user.alerts);

router.get("/", passport.authenticate('jwt', { session: false }), isAdmin, user.fetchUsers)

router.get("/:id", passport.authenticate('jwt', { session: false }), isUserOrAdmin, user.fetchUser)

router.post("/signup", auth.signup)

router.post("/login", auth.login)

router.put("/:id", passport.authenticate('jwt', { session: false }), isUserOrAdmin, user.updateUser)

router.delete("/:id", passport.authenticate('jwt', { session: false }), isAdmin, user.deleteUser)

module.exports = router;