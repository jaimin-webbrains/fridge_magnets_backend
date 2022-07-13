const { getCurrentTime } = require("../helpers/helpers");

class News {
    constructor() {}

    // Fetching all news.
    
    async getNews() {
        try {
            const [rows_news, fields] = await connectPool.query(
                `SELECT * FROM news`
            );

            return rows_news;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

 

    // Add new News.
    async addNews(input,file) {

        const newsData = {
            news : input.news,
            news_description:input.news_description,
            news_image:file.filename
        }
        
        try {
            const [rows_news, fields] = await connectPool.query(
                `SELECT id,news from news WHERE news = ? LIMIT 1`,
                [input.news]
            );

            
            if (rows_news.length === 0) {
                const [rows, fields] = await connectPool.query(
                    "INSERT INTO news set ? ",
                    { ...newsData, created_at: getCurrentTime() }
                );
                return rows;
            }
            return rows_news;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

    // Updating news by its id.
    async updateNews(input,file) {
        
        try {
            const [rows_news, fields] = await connectPool.query(
                `SELECT id from news WHERE id = ? LIMIT 1`,
                [input.id]
            );

            if (rows_news.length === 1) {
                const [check_news, fields] = await connectPool.query(
                    `SELECT news from news WHERE id != ? and news = ? LIMIT 1`,
                    [input.id, input.news]
                );
                if (check_news.length === 0) {
                    const [rows, updateFields] = await connectPool.query(
                        `UPDATE news SET 
                    news = ?,
                    news_description=?,
                    news_image = ?,                                       
                    updated_at = ? 
                    WHERE id = ?`,
                        [
                            input.news,
                            input.news_description,
                            file?.filename?file.filename:input.news_image,                                                    
                            getCurrentTime(),
                            input.id,
                        ]
                    );
                    return rows;
                }
                return check_news;
            }
            return rows_news;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

    // Delete news by its id.
    async deleteNews(id) {
        try {
            const [rows_news, fields] = await connectPool.query(
                `SELECT id from news WHERE id = ? LIMIT 1`,
                [id]
            );

            if (rows_news.length === 1) {
                const [rows, updateFields] = await connectPool.query(
                    `DELETE FROM news 
                    WHERE id = ?`,
                    [id]
                );
                return rows;
            }
            return rows_news;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }
}

module.exports = new News();
