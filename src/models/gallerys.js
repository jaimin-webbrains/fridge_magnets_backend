const { getCurrentTime } = require("../helpers/helpers");

class Gallerys {
  constructor() {}

  // Fetching all gallerys.

  async getGallerys() {
    try {
      const [rows_gallerys, fields] = await connectPool.query(
        `SELECT g.*,c.name as category_name FROM gallerys as g join categories as c on c.id = g.category_id`
      );
      console.log("rows_gallerys",rows_gallerys)
      return rows_gallerys;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  // Add new Gallerys.
  async addGallery(input, file) {
    try {
    //   const [rows_gallerys, fields] = await connectPool.query(
    //     `SELECT id,category_id from gallerys  LIMIT 1`,      
    //   );
      console.log("rows_gallerys", file.length,file);

        let s = 0;
        while (s < file.length) {
          let galleryImagesData = {};

        //   if (file) {
            galleryImagesData = {
              category_id: input.category_id,
              product_Images: file[s].filename,
            };
        //   }
        // console.log("galleryImagesData",galleryImagesData)
          const [rows, fields] = await connectPool.query(
            "INSERT INTO gallerys set ? ",
            { ...galleryImagesData, created_at: getCurrentTime() }
          );
          s++
          console.log(rows)
          // return true;
        }
        return true;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  // Updating gallery by its id.
  // async updateGallery(input,file) {
  //   try {
  //     const [rows_gallerys, fields] = await connectPool.query(
  //       `SELECT id from gallerys WHERE id = ? LIMIT 1`,
  //       [input.id]
  //     );

  //     if (rows_gallerys.length === 1) {
  //       const [check_gallerys, fields] = await connectPool.query(
  //         `SELECT category_id from gallerys WHERE id != ? and category_id = ? LIMIT 1`,
  //         [input.id, input.category_id]
  //       );
  //       if (check_gallerys.length === 0) {

  //         let s = 0;
  //         while (s < file.length) {
  //         const [rows, updateFields] = await connectPool.query(
  //           `UPDATE gallerys SET 
  //                   category_id = ?,  
  //                   product_Images = ?,                    
  //                   updated_at = ? 
  //                   WHERE id = ?`,
  //           [input.category_id,file[s].filename, getCurrentTime(), input.id]
  //         );
  //         }
  //         return true
  //         // return rows;
  //       }
  //       return check_gallerys;
  //     }
  //     return rows_gallerys;
  //   } catch (e) {
  //     console.log(e);
  //     throw new Error(e);
  //   }
  // }

  // Delete gallery by its id.
  async deleteGallery(id) {
    try {
      const [rows_gallerys, fields] = await connectPool.query(
        `SELECT id from gallerys WHERE id = ? LIMIT 1`,
        [id]
      );

      if (rows_gallerys.length === 1) {
        const [rows, updateFields] = await connectPool.query(
          `DELETE FROM gallerys 
                    WHERE id = ?`,
          [id]
        );
        return rows;
      }
      return rows_gallerys;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}

module.exports = new Gallerys();
