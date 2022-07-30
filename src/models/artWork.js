const { getCurrentTime } = require("../helpers/helpers");

class ArtWork {
  constructor() {}

  // Fetching all settings.

  async getArtwork() {
    try {
      const [rows_settings, fields] = await connectPool.query(
        `SELECT * FROM artwork`
      );
      console.log("jgghgj", rows_settings);
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

  //     if (rows_settings.length === 0) {
  //       const [rows, fields] = await connectPool.query(
  //         "INSERT INTO setting set ? ",
  //         { ...input, created_at: getCurrentTime() }
  //       );
  //       return rows;
  //     }
  //     return rows_settings;
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }

  // Updating setting by its id.
  async updateArtwork(input, filename) {
    try {
      const [rows_settings, fields] = await connectPool.query(
        `SELECT * from artwork LIMIT 1`
      );
      if (rows_settings.length === 1) {
        const [check_settings, fields] = await connectPool.query(
          `SELECT * from artwork LIMIT 1`
        );

        const ans = filename.map((x) => x.filename);
        console.log(ans, "filename");
        console.log(check_settings);
        if (check_settings.length === 1) {
          const [rows, updateFields] = await connectPool.query(
            `UPDATE artwork SET
                    file = ?,
                    description=?,
                    updated_at = ?
                   `,
            [ans.toString(), input.description, getCurrentTime()]
          );
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

module.exports = new ArtWork();
