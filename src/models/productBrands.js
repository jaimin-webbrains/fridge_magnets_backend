const { getCurrentTime } = require("../helpers/helpers");

class Products {
    constructor() {}

    // Fetching all products.
    
    async getProductBrands() {
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
            return rows_products;

        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }
 

    // Add new Products.
    async addProductBrands(input) {
        
        try {
            const [rows_products, fields] = await connectPool.query(
                `SELECT product_id from productBrands WHERE product_id = ? LIMIT 1`,
                [input.product_id]
            );

            if (rows_products.length === 0) {
                const [rows, fields] = await connectPool.query(
                    "INSERT INTO productBrands set ? ",
                    { ...input, created_at: getCurrentTime() }
                );
                return rows;
            }
            return rows_products;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

    // Updating product by its id.
    async updateProduct(input,id) {
        
        try {
            const [rows_products, fields] = await connectPool.query(
                `SELECT id from products WHERE id = ? LIMIT 1`,
                [id]
            )

            if (rows_products.length === 1) {
                const [check_products, fields] = await connectPool.query(
                    `SELECT product_name from products WHERE id != ? and product_name = ? LIMIT 1`,
                    [id, input.product_name]
                );
             
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
