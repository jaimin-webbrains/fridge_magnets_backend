const { getCurrentTime } = require("../helpers/helpers");

class Markers {
    constructor() {}

    // Fetching all markers.
    
    async getMarkers() {
        try {
            const [rows_markers, fields] = await connectPool.query(
                `SELECT * FROM markers`
            );

            return rows_markers;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

 

    // Add new Markers.
    async addMarker(input) {
        
        try {
            const [rows_markers, fields] = await connectPool.query(
                `SELECT id,marker from markers WHERE marker = ? LIMIT 1`,
                [input.marker]
            );

            if (rows_markers.length === 0) {
                const [rows, fields] = await connectPool.query(
                    "INSERT INTO markers set ? ",
                    { ...input, created_at: getCurrentTime() }
                );
                return rows;
            }
            return rows_markers;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

    // Updating marker by its id.
    async updateMarker(input) {
        
        try {
            const [rows_markers, fields] = await connectPool.query(
                `SELECT id from markers WHERE id = ? LIMIT 1`,
                [input.id]
            );

            if (rows_markers.length === 1) {
                const [check_markers, fields] = await connectPool.query(
                    `SELECT marker from markers WHERE id != ? and marker = ? LIMIT 1`,
                    [input.id, input.marker]
                );
                if (check_markers.length === 0) {
                    const [rows, updateFields] = await connectPool.query(
                        `UPDATE markers SET 
                    marker = ?,
                                       
                    updated_at = ? 
                    WHERE id = ?`,
                        [
                            input.marker,
                                                    
                            getCurrentTime(),
                            input.id,
                        ]
                    );
                    return rows;
                }
                return check_markers;
            }
            return rows_markers;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

    // Delete marker by its id.
    async deleteMarker(id) {
        try {
            const [rows_markers, fields] = await connectPool.query(
                `SELECT id from markers WHERE id = ? LIMIT 1`,
                [id]
            );

            if (rows_markers.length === 1) {
                const [rows, updateFields] = await connectPool.query(
                    `DELETE FROM markers 
                    WHERE id = ?`,
                    [id]
                );
                return rows;
            }
            return rows_markers;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }
}

module.exports = new Markers();
