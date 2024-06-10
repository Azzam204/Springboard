const express = require("express");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const User = require("../models/user");
const ExpressError = require("../expressError");

const router = new express.Router();

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

router.post('/login', async function (req,res,next){
    try {
        const {username,password} = req.body;
        const auth = await User.authenticate(username,password);

        if(auth) {

            await User.updateLoginTimestamp(username);

            const token = jwt.sign({ username },SECRET_KEY);
            return res.json({ token })
        }

        throw new ExpressError("Invalid user/password", 400)
        
    } catch (e) {
        next(e)
    }
});


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */


router.post('/register', async function (req,res,next) {
    try {
        const {
            username,
            password,
            first_name,
            last_name,
            phone
        } = req.body;

        await User.register({
            username,
            password,
            first_name,
            last_name,
            phone
        });

        User.updateLoginTimestamp(username);

        const token = jwt.sign({ username },SECRET_KEY);

        return res.json({ token })
        
    } catch (e) {
        next(e)
    }
})

module.exports = router;