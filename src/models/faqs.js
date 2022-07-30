const { getCurrentTime } = require("../helpers/helpers");

class FAQs {
  constructor() {}

  // Fetching all faqs.

  async getFAQsType() {
    try {
      const [rows_faqs, fields] = await connectPool.query(
        `SELECT * FROM faqs_master`
      );

      return rows_faqs;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
  async getFAQs() {
    try {
      const [rows_faqs, fields] = await connectPool.query(
        `SELECT a.*, b.faq_name FROM faqs_data as a LEFT JOIN faqs_master as b on a.faq_id = b.id`
      );
      console.log("rows_faqs", rows_faqs);

      // const [rows_faqs, fields] = await connectPool.query(
      //     `SELECT * FROM faqs_master`
      // );

      return rows_faqs;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  // Add new FAQs.
  async addFAQ(input) {
    console.log(input);
    try {
      const [rows_faqs, fields] = await connectPool.query(
        `SELECT id,faq_name from faqs_master WHERE faq_name = ? LIMIT 1`,
        [input.faq_name]
      );
      console.log("rows_faqs", rows_faqs);
      var data;

      if (rows_faqs.length === 0) {
        const [rows, fields] = await connectPool.query(
          "INSERT INTO faqs_master set ? ",
          { faq_name: input.faq_name, created_at: getCurrentTime() }
        );
        console.log(rows)
        data = rows.insertId;
      } else {
        data = rows_faqs[0].id;
      }

      const [rows, fields_faq] = await connectPool.query(
        "INSERT INTO faqs_data set ? ",
        {
          faq_id: data,
          question: input.question,
          answer: input.answer,
          created_at: getCurrentTime(),
        }
      );
      // console.log("rows",rows)
      return rows;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  // Updating faq by its id.
  async updateFAQ(input) {
    try {
      const [rows_faqs, fields] = await connectPool.query(
        `SELECT id from faqs_master WHERE faq_name = ? LIMIT 1`,
        [input.faq_name]
      );
      var data;

      if (rows_faqs.length === 0) {
        const [rows, fields] = await connectPool.query(
          "INSERT INTO faqs_master set ? ",
          { faq_name: input.faq_name, created_at: getCurrentTime() }
        );

        data = rows.insertId;
      } else {  
        data = rows_faqs[0].id;
      }

      console.log("datacmsdhbbbbbbbbbb=========>",data)

      //   const [rows_faqs2, fields2] = await connectPool.query(
      //     `SELECT id from faqs_data WHERE  = ? LIMIT 1`,
      //     [input.faqs_name]
      //   );

      //   if (rows_faqs.length === 0) {
      const [rows, updateFields] = await connectPool.query(
        `UPDATE faqs_data SET 
                        faq_id = ?,
                        question = ?,
                        answer = ?,
                        updated_at = ? 
                        WHERE id = ?`,
        [data, input.question, input.answer, getCurrentTime(), input.id]
      );
      return rows;
      //   }
      //   return check_faqs;

      //   return rows_faqs;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  // Delete faq by its id.
  async deleteFAQ(id) {
    try {
      const [rows_faqs, fields] = await connectPool.query(
        `SELECT id from faqs_data WHERE id = ? LIMIT 1`,
        [id]
      );

      if (rows_faqs.length === 1) {
        const [rows, updateFields] = await connectPool.query(
          `DELETE FROM faqs_data 
                    WHERE id = ?`,
          [id]
        );
        return rows;
      }
      return rows_faqs;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}

module.exports = new FAQs();
