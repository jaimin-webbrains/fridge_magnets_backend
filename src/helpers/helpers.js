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
const getIdFromSlug = async (slug) => {
  try {
    const [rows_categories, fields] = await connectPool.query(
      `SELECT id FROM categories where slug = ? limit 1`,
      [slug]
    );
    if (rows_categories.length == 1) {
      return rows_categories[0].id;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

module.exports = {
  getCurrentTime,
  unlinkFiles,
  getIdFromSlug,
};
