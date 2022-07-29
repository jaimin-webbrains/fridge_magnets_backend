const { getCurrentTime } = require("../helpers/helpers");

class Inquiry {
  constructor() {}

  async getInquiries() {
    try {
        const [rows_inquiry, fields] = await connectPool.query(
            `SELECT * FROM inquiry`
        );

        return rows_inquiry;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}

  // Add new inquiry.
  async addInquiry(input) {
    console.log("input*********************",input)
    try { 
      const [rows, fields] = await connectPool.query(
        "INSERT INTO inquiry set ? ",
        { ...input, created_at: getCurrentTime() }
      );
      console.log("rows=====================>>>>>>>>>>>",rows)
      return rows;

    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}

module.exports = new Inquiry();
