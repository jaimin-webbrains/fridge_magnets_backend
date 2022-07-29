const jwt = require("jsonwebtoken");
const ResponseHandler = require("../handlers/responsehandlers");
const MSGConst = require("../constants/messageconstants");

// const UserModel = require("../models/user");
const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer", "");
        const decoded = jwt.verify(token, "users");
        const [rows_user, fields] = await connectPool.query(
            "SELECT users.* FROM users LEFT JOIN users_token ON users_token.user_id = users.id WHERE users_token.user_id = ? AND users_token.token = ? LIMIT 1",
            [decoded.id, token]
        );

        if (rows_user.length == 0) {
            throw new Error();
        }

        // const user_info = await UserModel.getUserFullDetails(rows_user[0].id);
        // user_info.token = token;
        // req.user = user_info;
        next();
    } catch (e) {
        console.log(e)
        res.status(401,MSGConst.LOGIN_FAIL).send({ error: "Please authenticate" });
    }
};

module.exports = auth;
