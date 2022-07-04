const moment = require("moment");
const dotenv = require("dotenv").config();
var path = require("path");
const fs = require("fs");

// const TIME_ZONE = process.env.TIME_ZONE || "Australia/Sydney";
const getCurrentTime = () => moment().format("YYYY-MM-DD HH:mm:ss");

const unlinkFiles = async (file) => {
    if (fs.existsSync(file)) {
        await fs.unlinkSync(file);
    }
};

module.exports = {
    getCurrentTime,
    unlinkFiles,
};
