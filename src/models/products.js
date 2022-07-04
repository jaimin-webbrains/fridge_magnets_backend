const { getCurrentTime } = require("../helpers/helpers");

class Products {
  constructor() {}

  // Fetching all products.

  async getProducts() {
    try {
      const [rows_products, fields] = await connectPool.query(
        `SELECT * FROM products`
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

      // console.log("addProductcbxfcbxdfhzsvdjcgjkA>Sgxj",input.brands)

      if (rows_products.length === 0) {
        let productsData = {
          product_name: input.product_name,
          category_id: input.category_id,
          parent_category_id: input.parent_category_id,
          color_id: input.color_id,
          paper_type_id: input.paper_type_id,
          size_id: input.size_id,
          marker_id: input.marker_id,
          product_image: filesArr?.product_image[0]?.filename,
          show_on_home_page: parseInt(input.show_on_home_page),
        };

        const [rows, fields] = await connectPool.query(
          "INSERT INTO products set ? ",
          { ...productsData, created_at: getCurrentTime() }
        );

        let s = 0;
        const brands = (JSON.parse(input.brands))
        const brandImages = filesArr.brand_image
        while (s < brands.length) {

          console.log(brands[0].brand_id,brands.length)
          let brandsData={}
          if(brands){
            brandsData = {
              product_id: rows.insertId,
              brand_id: brands[s].brand_id,
              brandimg: brandImages[s].filename,
              // brandimg: filename,
              show_on_homepage: brands[s].product_show,
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
    console.log("input", input);
    try {
      const [rows_products, fields] = await connectPool.query(
        `SELECT id from products WHERE id = ? LIMIT 1`,
        [id]
      );

      // const [rows_productbrands, fieldsVal ] = await connectPool.query(
      //   `SELECT * from productBrands
      //   INNER JOIN`
      // )

      if (rows_products.length === 1) {
        const [check_products, fields] = await connectPool.query(
          `SELECT product_name from products WHERE id != ? and product_name = ? LIMIT 1`,
          [id, input.product_name]
        );
        var product_image = input.product_image;
        if (
          filesArr.product_image &&
          filesArr.product_image[0] &&
          filesArr.product_image[0].filename
        ) {
          product_image = filesArr?.product_image[0]?.filename;
        }
        if (check_products.length === 0) {
          const [rows, updateFields] = await connectPool.query(
            `UPDATE products SET 
                    product_name = ?,
                    category_id = ?,
                    parent_category_id = ?,
                    color_id = ?,
                    size_id = ?,
                    paper_type_id = ?,
                    marker_id = ?,
                    product_image = ?,
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
              parseInt(input.show_on_home_page),
              getCurrentTime(),
              id,
            ]
          );
          return rows;
        }
        return check_products;
      }
      return rows_products;
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
