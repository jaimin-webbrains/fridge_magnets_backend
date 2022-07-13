const { getCurrentTime } = require("../helpers/helpers");

class Sizes {
    constructor() {}

    // Fetching all sizes.
    
    async getSizes() {
        try {
            const [rows_sizes, fields] = await connectPool.query(
                `SELECT * FROM sizes`
            );

            return rows_sizes;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

 

    // Add new Sizes.
    async addSize(input) {
        
        try {
            const [rows_sizes, fields] = await connectPool.query(
                `SELECT id,size from sizes WHERE size = ? LIMIT 1`,
                [input.size]
            );

            if (rows_sizes.length === 0) {
                const [rows, fields] = await connectPool.query(
                    "INSERT INTO sizes set ? ",
                    { ...input, created_at: getCurrentTime() }
                );
                return rows;
            }
            return rows_sizes;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

    // Updating size by its id.
    async updateSize(input) {
        
        try {
            const [rows_sizes, fields] = await connectPool.query(
                `SELECT id from sizes WHERE id = ? LIMIT 1`,
                [input.id]
            );

            if (rows_sizes.length === 1) {
                const [check_sizes, fields] = await connectPool.query(
                    `SELECT size from sizes WHERE id != ? and size = ? LIMIT 1`,
                    [input.id, input.size]
                );
                if (check_sizes.length === 0) {
                    const [rows, updateFields] = await connectPool.query(
                        `UPDATE sizes SET 
                    size = ?,
                                       
                    updated_at = ? 
                    WHERE id = ?`,
                        [
                            input.size,
                                                    
                            getCurrentTime(),
                            input.id,
                        ]
                    );
                    return rows;
                }
                return check_sizes;
            }
            return rows_sizes;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

    // Delete size by its id.
    async deleteSize(id) {
        try {
            const [rows_sizes, fields] = await connectPool.query(
                `SELECT id from sizes WHERE id = ? LIMIT 1`,
                [id]
            );

            if (rows_sizes.length === 1) {
                const [rows, updateFields] = await connectPool.query(
                    `DELETE FROM sizes 
                    WHERE id = ?`,
                    [id]
                );
                return rows;
            }
            return rows_sizes;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }
}

module.exports = new Sizes();
