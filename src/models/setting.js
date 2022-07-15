const { getCurrentTime } = require("../helpers/helpers");

class Setting {
  constructor() {}

  // Fetching all settings.

  async getSetting() {
    try {
      const [rows_settings, fields] = await connectPool.query(
        `SELECT * FROM setting`
      );

      return rows_settings;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  // Add new Settings.
  // async addsetting(input) {
  //   try {
  //     const [rows_settings, fields] = await connectPool.query(
  //       `SELECT * from setting  LIMIT 1`
  //     );

  //     console.log(input);

  //     if (rows_settings.length === 0) {
  //       const [rows, fields] = await connectPool.query(
  //         "INSERT INTO setting set ? ",
  //         { ...input, created_at: getCurrentTime() }
  //       );
  //       return rows;
  //     }
  //     return rows_settings;
  //   } catch (e) {
  //     console.log(e);
  //     throw new Error(e);
  //   }
  // }

  // Updating setting by its id.
  async updateSetting(input, filename) {
    try {
      const [rows_settings, fields] = await connectPool.query(
        `SELECT * from setting LIMIT 1`
      );
      console.log("ggjg", filename);
      if (rows_settings.length === 1) {
        const [check_settings, fields] = await connectPool.query(
          `SELECT * from setting LIMIT 1`
        );
        console.log(check_settings.length);
        if (check_settings.length === 1) {
          const [rows, updateFields] = await connectPool.query(
            `UPDATE setting SET
                    phone_no = ?,
                    email = ?,
                    logo=?,
                    artwork_label1=?,
                    artwork_label2=?,
                    updated_at = ?
                   `,
            [
              input.phone_no,
              input.email,
              filename,
              input.artwork_label1,
              input.artwork_label2,
              getCurrentTime(),
            ]
          );
          console.log(rows);
          return rows;
        }
        return check_settings;
      }
      return rows_settings;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  // Delete setting by its id.
  // async deleteSetting(id) {
  //   try {
  //     const [rows_settings, fields] = await connectPool.query(
  //       `SELECT id from settings WHERE id = ? LIMIT 1`,
  //       [id]
  //     );

  //     if (rows_settings.length === 1) {
  //       const [rows, updateFields] = await connectPool.query(
  //         `DELETE FROM settings
  //                   WHERE id = ?`,
  //         [id]
  //       );
  //       return rows;
  //     }
  //     return rows_settings;
  //   } catch (e) {
  //     console.log(e);
  //     throw new Error(e);
  //   }
  // }
}

module.exports = new Setting();
