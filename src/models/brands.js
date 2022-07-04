const { getCurrentTime } = require("../helpers/helpers");

class Brands {
    constructor() {}

    // Fetching all brands.
    
    async getBrands() {
        try {
            const [rows_brands, fields] = await connectPool.query(
                `SELECT * FROM brands`
            );

            return rows_brands;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

 

    // Add new Brands.
    async addBrand(input) {
        
        try {
            const [rows_brands, fields] = await connectPool.query(
                `SELECT name from brands WHERE name = ? LIMIT 1`,
                [input.name]
            );

            if (rows_brands.length === 0) {
                const [rows, fields] = await connectPool.query(
                    "INSERT INTO brands set ? ",
                    { ...input, created_at: getCurrentTime() }
                );
                return rows;
            }
            return rows_brands;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

    // Updating brand by its id.
    async updateBrand(input) {
        
        try {
            const [rows_brands, fields] = await connectPool.query(
                `SELECT id from brands WHERE id = ? LIMIT 1`,
                [input.id]
            );

            if (rows_brands.length === 1) {
                const [check_brands, fields] = await connectPool.query(
                    `SELECT name from brands WHERE id != ? and name = ? LIMIT 1`,
                    [input.id, input.name]
                );
                if (check_brands.length === 0) {
                    const [rows, updateFields] = await connectPool.query(
                        `UPDATE brands SET 
                    name = ?,
                    description = ?,                    
                    updated_at = ? 
                    WHERE id = ?`,
                        [
                            input.name,
                            input.description,                           
                            getCurrentTime(),
                            input.id,
                        ]
                    );
                    return rows;
                }
                return check_brands;
            }
            return rows_brands;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

    // Delete brand by its id.
    async deleteBrand(id) {
        try {
            const [rows_brands, fields] = await connectPool.query(
                `SELECT id from brands WHERE id = ? LIMIT 1`,
                [id]
            );

            if (rows_brands.length === 1) {
                const [rows, updateFields] = await connectPool.query(
                    `DELETE FROM brands 
                    WHERE id = ?`,
                    [id]
                );
                return rows;
            }
            return rows_brands;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }
}

module.exports = new Brands();
