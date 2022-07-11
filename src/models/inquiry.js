const { getCurrentTime } = require("../helpers/helpers");

class Inquiry {
  constructor() {}

  // Add new inquiry.
  async addInquiry(input) {
    try {
      const [rows, fields] = await connectPool.query(
        "INSERT INTO inquiry set ? ",
        { ...input, created_at: getCurrentTime() }
      );
      return rows;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}

module.exports = new Inquiry();
