const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const users = require("../database/models/users");

// to check if a request is comming from a valid logged in user or not

/////////////////////AUTHORIZATION MIDDLEWARE///////////////////////////
const msg = "you are not authorized to view this page!";
const auth = async (req, res, next) => {
    const rawToken = req.headers.authorization;
    if (!rawToken || !rawToken.startsWith("Bearer ")) {
        res.send({ error: msg });
        return;
    }
    const encodedToken = rawToken.substring(7, rawToken.length);
    var decodedToken = null;
    try {
        decodedToken = await jwt.verify(encodedToken, SECRET_KEY);
    } catch (error) {
        res.send({ error: msg });
        return;
    }
    const userId = decodedToken.userId;
    const user = await users.findOne({ username: userId });
    if (!user) {
        res.send({ error: msg });
        return;
    }
    const ifTokenExists = user.tokens.filter(
        (tokenObj) => tokenObj.token === encodedToken
    );
    if (ifTokenExists.length == 0) {
        res.send({ error: msg });
        return;
    }
    req.app.locals.user = user;
    req.app.locals.user.token = encodedToken;
    next();
};
//////////////////////////////////////////////////////////////////////

module.exports = auth;
