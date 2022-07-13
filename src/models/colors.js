const { getCurrentTime } = require("../helpers/helpers");

class Colors {
    constructor() {}

    // Fetching all colors.
    
    async getColors() {
        try {
            const [rows_colors, fields] = await connectPool.query(
                `SELECT * FROM colors`
            );

            return rows_colors;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

 

    // Add new Colors.
    async addColor(input) {
        
        try {
            const [rows_colors, fields] = await connectPool.query(
                `SELECT id,color from colors WHERE color = ? LIMIT 1`,
                [input.color]
            );

            if (rows_colors.length === 0) {
                const [rows, fields] = await connectPool.query(
                    "INSERT INTO colors set ? ",
                    { ...input, created_at: getCurrentTime() }
                );
                return rows;
            }
            return rows_colors;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

    // Updating color by its id.
    async updateColor(input) {
        
        try {
            const [rows_colors, fields] = await connectPool.query(
                `SELECT id from colors WHERE id = ? LIMIT 1`,
                [input.id]
            );

            if (rows_colors.length === 1) {
                const [check_colors, fields] = await connectPool.query(
                    `SELECT color from colors WHERE id != ? and color = ? LIMIT 1`,
                    [input.id, input.color]
                );
                if (check_colors.length === 0) {
                    const [rows, updateFields] = await connectPool.query(
                        `UPDATE colors SET 
                    color = ?,
                                       
                    updated_at = ? 
                    WHERE id = ?`,
                        [
                            input.color,
                                                    
                            getCurrentTime(),
                            input.id,
                        ]
                    );
                    return rows;
                }
                return check_colors;
            }
            return rows_colors;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

    // Delete color by its id.
    async deleteColor(id) {
        try {
            const [rows_colors, fields] = await connectPool.query(
                `SELECT id from colors WHERE id = ? LIMIT 1`,
                [id]
            );

            if (rows_colors.length === 1) {
                const [rows, updateFields] = await connectPool.query(
                    `DELETE FROM colors 
                    WHERE id = ?`,
                    [id]
                );
                return rows;
            }
            return rows_colors;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }
}

module.exports = new Colors();
