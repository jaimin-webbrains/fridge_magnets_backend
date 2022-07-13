const { getCurrentTime } = require("../helpers/helpers");

class Papers {
    constructor() {}

    // Fetching all papers.
    
    async getPapers() {
        try {
            const [rows_papers, fields] = await connectPool.query(
                `SELECT * FROM papers`
            );

            return rows_papers;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

 

    // Add new Papers.
    async addPaper(input) {
        
        try {
            const [rows_papers, fields] = await connectPool.query(
                `SELECT id,paper from papers WHERE paper = ? LIMIT 1`,
                [input.paper]
            );

            if (rows_papers.length === 0) {
                const [rows, fields] = await connectPool.query(
                    "INSERT INTO papers set ? ",
                    { ...input, created_at: getCurrentTime() }
                );
                return rows;
            }
            return rows_papers;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

    // Updating paper by its id.
    async updatePaper(input) {
        
        try {
            const [rows_papers, fields] = await connectPool.query(
                `SELECT id from papers WHERE id = ? LIMIT 1`,
                [input.id]
            );

            if (rows_papers.length === 1) {
                const [check_papers, fields] = await connectPool.query(
                    `SELECT paper from papers WHERE id != ? and paper = ? LIMIT 1`,
                    [input.id, input.paper]
                );
                if (check_papers.length === 0) {
                    const [rows, updateFields] = await connectPool.query(
                        `UPDATE papers SET 
                    paper = ?,
                                       
                    updated_at = ? 
                    WHERE id = ?`,
                        [
                            input.paper,
                                                    
                            getCurrentTime(),
                            input.id,
                        ]
                    );
                    return rows;
                }
                return check_papers;
            }
            return rows_papers;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

    // Delete paper by its id.
    async deletePaper(id) {
        try {
            const [rows_papers, fields] = await connectPool.query(
                `SELECT id from papers WHERE id = ? LIMIT 1`,
                [id]
            );

            if (rows_papers.length === 1) {
                const [rows, updateFields] = await connectPool.query(
                    `DELETE FROM papers 
                    WHERE id = ?`,
                    [id]
                );
                return rows;
            }
            return rows_papers;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }
}

module.exports = new Papers();
