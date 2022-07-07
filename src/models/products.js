const { getCurrentTime } = require("../helpers/helpers");

class Products {
  constructor() {}

  // Fetching all products.

  async getProducts() {
    try {
      const [rows_products, fields] = await connectPool.query(
        `SELECT * FROM products order by id desc`
      );

      return rows_products;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async getEditProduct(input) {
    try {
      const [rows_products, fields] = await connectPool.query(
        `SELECT * FROM products  WHERE id = ? LIMIT 1`,
        [input.id]
      );
      const [rows_productbrands, fieldsVal] = await connectPool.query(
        `SELECT * from productBrands WHERE product_id = ?`,
        [input.id]
      );

      rows_products[0].brands = rows_productbrands;

      return rows_products[0];
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  // Add new Products.
  async addProduct(input, filesArr) {
    try {
      const [rows_products, fields] = await connectPool.query(
        `SELECT product_name from products WHERE product_name = ? LIMIT 1`,
        [input.product_name]
      );

      if (rows_products.length === 0) {
        let productsData = {
          product_name: input.product_name,
          category_id: input.category_id,
          parent_category_id: input.parent_category_id,
          color_id: input.color_id,
          paper_type_id: input.paper_type_id,
          size_id: input.size_id,
          marker_id: input.marker_id,
          product_quantity:input.product_quantity,
          SKU:input.SKU,
          product_image: filesArr?.product_image[0]?.filename,
          show_on_home_page: parseInt(input.show_on_home_page),
        };

        const [rows, fields] = await connectPool.query(
          "INSERT INTO products set ? ",
          { ...productsData, created_at: getCurrentTime() }
        );

        let s = 0;
        const brands = JSON.parse(input.brands);
        const brandImages = filesArr.brand_image;
        while (s < brands.length) {

          let brandsData = {};

          if (brands) {
            brandsData = {
              product_id: rows.insertId,
              brand_id: brands[s].brand_id,
              brandimg: brandImages[s].filename,
              // brandimg: filename,
              show_on_homepage: brands[s].show_on_homepage,
              // position: s + 1,
              created_at: getCurrentTime(),
            };
          }
          const [insert_status, fields2] = await connectPool.query(
            `INSERT into productBrands SET ?`,
            brandsData
          );
          s++;
        }

        return rows;
      }

      return rows_products;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  // Updating product by its id.
  async updateProduct(input, id, filesArr) {
    console.log("inpuy",input)

    try {
      const [rows_products, fields] = await connectPool.query(
        `SELECT id from products WHERE id = ? LIMIT 1`,
        [id]
      );

      if (rows_products.length === 1) {
        const [rows_products_exist, fields_exist] = await connectPool.query(
          `SELECT product_name from products WHERE product_name = '${input.product_name}' and id != ? LIMIT 1`,
          [id]
        );
        if (rows_products_exist.length === 1) {
          return rows_products_exist;
        }
        var product_image = input.product_image;
        if (
          filesArr !== undefined &&
          filesArr.product_image !== undefined &&
          filesArr.product_image[0] !== undefined
        ) {
          product_image = filesArr?.product_image[0]?.filename;
        }

        const [rows, fields] = await connectPool.query(
          `UPDATE products set  product_name = ?,
          category_id = ?,
          parent_category_id = ?,
          color_id = ?,
          size_id = ?,
          paper_type_id = ?,
          marker_id = ?,
          product_image = ?,
          product_quantity = ?,
          SKU = ?,
          show_on_home_page = ?,
          updated_at = ? 
          WHERE id = ?`,
         
          [
            input.product_name,
            input.category_id,
            input.parent_category_id,
            input.color_id,
            input.size_id,
            input.paper_type_id,
            input.marker_id,
            product_image,
            input.product_quantity,
            input.SKU,
            parseInt(input.show_on_home_page),
            getCurrentTime(),
            id,
          ]
        );

        let brandsData = {};

        let s = 0;
        const brands = JSON.parse(input.brands);
        const brandImages = filesArr?.brand_image;
        while (s < brands.length) {
          var imageName;
          if (brandImages?.length > 0) {
            imageName = brandImages.find(
              (x) => x.originalname === brands[s].brandimg
            );
          }
          if (brands[s].id !== undefined) {
            brandsData = {
              id: brands[s].id,
              brand_id: brands[s].brand_id,
              brandimg:
                imageName && imageName?.filename
                  ? imageName.filename
                  : brands[s].brandimg,
              show_on_homepage: brands[s].show_on_homepage,
            };

            const [update_status, fields2] = await connectPool.query(
              `UPDATE productBrands SET 
            brand_id = ?,
            brandimg = ?,
            show_on_homepage = ?,
            updated_at = ? 
            WHERE id = ?`,
              [
                brandsData.brand_id,
                brandsData.brandimg,
                brandsData.show_on_homepage,
                getCurrentTime(),
                brandsData.id,
              ]
            );
          } else {
            brandsData = {
              product_id: id,
              brand_id: brands[s].brand_id,
              brandimg: imageName && imageName?.filename && imageName.filename,
              // brandimg: filename,
              show_on_homepage: brands[s].show_on_homepage,
              // position: s + 1,
              created_at: getCurrentTime(),
            };

            const [insert_status, fields2] = await connectPool.query(
              `INSERT into productBrands SET ?`,
              brandsData
            );
          }
          s++;
        }

        const val = JSON.parse(input.deleted_brands);
        let i = 0;
        while (i < val.length) {
          const [deleteBrands, fields_delete] = await connectPool.query(
            `DELETE from productBrands WHERE id = ? LIMIT 1`,
            [val[i]]
          );
          i++;
        }
        return rows;
      }
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  // Delete product by its id.
  async deleteProduct(id) {
    try {
      const [rows_products, fields] = await connectPool.query(
        `SELECT id from products WHERE id = ? LIMIT 1`,
        [id]
      );

      if (rows_products.length === 1) {
        const [rows, updateFields] = await connectPool.query(
          `DELETE FROM products 
                    WHERE id = ?`,
          [id]
        );

        if (rows) {
          const [rows_delete, updateFields] = await connectPool.query(
            `DELETE FROM productBrands 
                      WHERE product_id  = ?`,
            [id]
          );

          return rows_delete;
        }
        return rows;
      }
      return rows_products;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}

module.exports = new Products();
