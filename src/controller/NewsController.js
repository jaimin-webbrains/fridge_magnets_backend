const ResponseHandler = require("../handlers/responsehandlers");
const MSGConst = require("../constants/messageconstants");
const News = require("../models/news");

class NewsController {
    constructor() {}

    // Fetching all news.
    async getNews(req, res) {
        try {
            const result = await News.getNews()

            if (!result) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    []
                );
            }
            if (result) {
                return ResponseHandler.successResponse(res, 200, "", result);
            }
        } catch (e) {
            console.log(e);
            ResponseHandler.errorResponse(
                res,
                400,
                MSGConst.SOMETHING_WRONG,
                []
            );
        }
    }

    // Add new News.
    async addNews(req, res) {
        try {
            req.checkBody("news")
                .notEmpty()
                .withMessage("Please enter news name.")
                           
            req.checkBody("news_description")
                .notEmpty()
                .withMessage("Please enter news Description.")
                
                   
            
           
            const errors = req.validationErrors();
            if (errors) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    errors
                );
            }

            const result = await News.addNews(req.body,req.file);

            if (!result) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    []
                );
            }
            if (result) {
                
                if (result[0]?.news === req.body.news) {
                   
                    return ResponseHandler.errorResponse(
                        res,
                        400,
                        MSGConst.NEWS_EXIST
                    );
                }
                return ResponseHandler.successResponse(
                    res,
                    200,
                    MSGConst.NEWS_ADD,
                    []
                );
            }
        } catch (e) {
            console.log(e);
            ResponseHandler.errorResponse(
                res,
                400,
                MSGConst.SOMETHING_WRONG,
                []
            );
        }
    }

    // Updating news by its id.
    async updateNews(req, res) {
        try {
            req.checkBody("news")
                .notEmpty()
                .withMessage("Please enter news name.")
                .isLength({ max: 50 })
                .withMessage("name length less then 50 char")
            
            req.checkBody("news_description")
                .notEmpty()
                .withMessage("Please enter news name.")
                .isLength({ max: 50 })
                .withMessage("name length less then 50 char")
            
             
            const errors = req.validationErrors();

            if (errors) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    errors
                );
            }
            const result = await News.updateNews(req.body,req.file);

            if (!result) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    []
                );
            }
            if (result) {
                if (result[0]?.news === req.body.news) {
                    return ResponseHandler.errorResponse(
                        res,
                        400,
                        MSGConst.NEWS_EXIST
                    );
                }
                return ResponseHandler.successResponse(
                    res,
                    200,
                    MSGConst.NEWS_UPDATE,
                    []
                );
            }
        } catch (e) {
            console.log(e);
            ResponseHandler.errorResponse(
                res,
                400,
                MSGConst.SOMETHING_WRONG,
                []
            );
        }
    }

    // Delete news by its id.
    async deleteNews(req, res) {
        try {
            const result = await News.deleteNews(req.body.id);

            if (!result) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    []
                );
            }
            if (result) {
                return ResponseHandler.successResponse(
                    res,
                    200,
                    MSGConst.NEWS_DELETE,
                    []
                );
            }
        } catch (e) {
            console.log(e);
            ResponseHandler.errorResponse(
                res,
                400,
                MSGConst.SOMETHING_WRONG,
                []
            );
        }
    }
}

module.exports = new NewsController();
