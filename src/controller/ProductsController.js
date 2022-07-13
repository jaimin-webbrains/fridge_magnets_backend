const ResponseHandler = require("../handlers/responsehandlers");
const MSGConst = require("../constants/messageconstants");
const Products = require("../models/products");
const categories = require("../models/categories");
const colors = require("../models/colors");
const Sizes = require("../models/sizes");
const Papers = require("../models/papers");
const Markers = require("../models/markers");
const Brands = require("../models/brands");
const { parse } = require("csv-parse");
const fs = require("fs");
const products = require("../models/products");
const path = require("path");
const { getCurrentTime } = require("../helpers/helpers");

// const Connection = require("mysql2/typings/mysql/lib/Connection");

class ProductsController {
    constructor() {}

    // Fetching all products.
    async getProducts(req, res) {
        try {
            const result = await Products.getProducts();

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

    async getProductsTable(req, res) {
        try {
            const result = await Products.getProductsTable();

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

    //Edit Product
    async getEditProduct(req, res) {
        try {
            const result = await Products.getEditProduct(req.body);

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

    // Add new Products.
    async addProduct(req, res) {
        let category_insertId = "";
        let color_insertId = "";
        let size_insertId = "";
        let paper_type_insertId = "";
        let marker_insertId = "";

        try {
            // CATEGORIES
            if (
                req.body.category_id == 0 &&
                req.body.category_name &&
                req.body.category_name != ""
            ) {
                const data = {
                    name: req.body.category_name,
                    description: req.body.category_name,
                    parent_id: req.body.parent_category_id,
                };
                const result = await categories.addCategory(data, res);
                category_insertId = result.insertId;
            }

            // COLORS
            if (
                req.body.color_id == 0 &&
                req.body.color_name &&
                req.body.color_name != ""
            ) {
                const color_data = {
                    color: req.body.color_name,
                };
                const result = await colors.addColor(color_data, res);
                color_insertId = result.insertId;
            }

            // SIZE

            if (
                req.body.size_id == 0 &&
                req.body.size_val &&
                req.body.size_val != ""
            ) {
                const size_data = {
                    size: req.body.size_val,
                };
                const result = await Sizes.addSize(size_data, res);
                size_insertId = result.insertId;
            }

            // PAPER
            if (
                req.body.paper_type_id == 0 &&
                req.body.paper_type &&
                req.body.paper_type != ""
            ) {
                const paper_data = {
                    paper: req.body.paper_type,
                };
                const result = await Papers.addPaper(paper_data, res);
                paper_type_insertId = result.insertId;
            }

            // MARKER

            if (
                req.body.marker_id == 0 &&
                req.body.marker_val &&
                req.body.marker_val != ""
            ) {
                const marker_data = {
                    marker: req.body.marker_val,
                };
                const result = await Markers.addMarker(marker_data, res);
                marker_insertId = result.insertId;
            }

            const ids = {
                category_insertId: category_insertId,
                color_insertId: color_insertId,
                size_insertId: size_insertId,
                marker_insertId: marker_insertId,
                paper_type_insertId: paper_type_insertId,
            };

            // paper = ? LIMIT 1`,
            // [input.paper]

            req.checkBody("product_name")
                .notEmpty()
                .withMessage("Please enter product name.");

            req.checkBody("category_id")
                .notEmpty()
                .withMessage("Please enter category id.")
                .isInt()
                .withMessage("Please enter valid category id.");

            req.checkBody("parent_category_id")
                .notEmpty()
                .withMessage("Please enter parent category id.")
                .isInt()
                .withMessage("Please enter valid parent category id.");

            // req
            //   .checkBody("color_id")
            //   .notEmpty()
            //   .withMessage("Please enter color id.")
            //   .isInt()
            //   .withMessage("Please enter valid color id.");

            // req
            //   .checkBody("size_id")
            //   .notEmpty()
            //   .withMessage("Please enter size id.")
            //   .isInt()
            //   .withMessage("Please enter valid size id.");

            // req
            //   .checkBody("paper_type_id")
            //   .notEmpty()
            //   .withMessage("Please enter paper type id.")
            //   .isInt()
            //   .withMessage("Please enter valid paper type id.");

            // req
            //   .checkBody("marker_id")
            //   .notEmpty()
            //   .withMessage("Please enter marker id.")
            //   .isInt()
            //   .withMessage("Please enter valid marker id.");

            const errors = req.validationErrors();
            if (errors) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    errors
                );
            }

            const result = await Products.addProduct(req.body, req.files, ids);

            if (!result) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    []
                );
            }
            if (result) {
                if (result[0]?.product_name === req.body.product_name) {
                    return ResponseHandler.errorResponse(
                        res,
                        400,
                        MSGConst.PRODUCT_EXIST
                    );
                }
                return ResponseHandler.successResponse(
                    res,
                    200,
                    MSGConst.PRODUCT_ADD,
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

    // Updating product by its id.
    async updateProduct(req, res) {
        let category_insertId = "";
        let color_insertId = "";
        let size_insertId = "";
        let paper_type_insertId = "";
        let marker_insertId = "";

        if (
            req.body.category_id == 0 &&
            req.body.category_name &&
            req.body.category_name != ""
        ) {
            const data = {
                name: req.body.category_name,
                description: req.body.category_name,
                parent_id: req.body.parent_category_id,
            };
            const result = await categories.addCategory(data, res);
            category_insertId = result.insertId;
        }

        //COLOR
        if (
            req.body.color_id == 0 &&
            req.body.color_name &&
            req.body.color_name != ""
        ) {
            const color_data = {
                color: req.body.color_name,
            };
            const result = await colors.addColor(color_data, res);
            color_insertId = result.insertId;
        }

        // SIZE
        if (
            req.body.size_id == 0 &&
            req.body.size_val &&
            req.body.size_val != ""
        ) {
            const size_data = {
                size: req.body.size_val,
            };
            const result = await Sizes.addSize(size_data, res);
            size_insertId = result.insertId;
        }

        // PAPER
        if (
            req.body.paper_type_id == 0 &&
            req.body.paper_type &&
            req.body.paper_type != ""
        ) {
            const paper_data = {
                paper: req.body.paper_type,
            };
            const result = await Papers.addPaper(paper_data, res);
            paper_type_insertId = result.insertId;
        }

        // MARKER

        if (
            req.body.marker_id == 0 &&
            req.body.marker_val &&
            req.body.marker_val != ""
        ) {
            const marker_data = {
                marker: req.body.marker_val,
            };
            const result = await Markers.addMarker(marker_data, res);
            marker_insertId = result.insertId;
        }

        const ids = {
            category_insertId: category_insertId,
            color_insertId: color_insertId,
            size_insertId: size_insertId,
            marker_insertId: marker_insertId,
            paper_type_insertId: paper_type_insertId,
        };
        try {
            req.checkBody("product_name")
                .notEmpty()
                .withMessage("Please enter product name.");

            req.checkBody("category_id")
                .notEmpty()
                .withMessage("Please enter category id.")
                .isInt()
                .withMessage("Please enter valid category id.");

            req.checkBody("parent_category_id")
                .notEmpty()
                .withMessage("Please enter parent category id.")
                .isInt()
                .withMessage("Please enter valid parent category id.");

            // req
            //   .checkBody("color_id")
            //   .notEmpty()
            //   .withMessage("Please enter color id.")
            //   .isInt()
            //   .withMessage("Please enter valid color id.");

            // req
            //   .checkBody("size_id")
            //   .notEmpty()
            //   .withMessage("Please enter size id.")
            //   .isInt()
            //   .withMessage("Please enter valid size id.");

            // req
            //   .checkBody("paper_type_id")
            //   .notEmpty()
            //   .withMessage("Please enter paper type id.")
            //   .isInt()
            //   .withMessage("Please enter valid paper type id.");

            // req
            //   .checkBody("marker_id")
            //   .notEmpty()
            //   .withMessage("Please enter marker id.")
            //   .isInt()
            //   .withMessage("Please enter valid marker id.");

            const errors = req.validationErrors();

            if (errors) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    errors
                );
            }

            const result = await Products.updateProduct(
                req.body,
                req.params.id,
                req.files,
                ids
            );

            if (!result) {
                return ResponseHandler.errorResponse(
                    res,
                    400,
                    MSGConst.SOMETHING_WRONG,
                    []
                );
            }
            if (result) {
                if (result[0]?.product_name === req.body.product_name) {
                    return ResponseHandler.errorResponse(
                        res,
                        400,
                        MSGConst.PRODUCT_EXIST
                    );
                }
                return ResponseHandler.successResponse(
                    res,
                    200,
                    MSGConst.PRODUCT_UPDATE,
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

    // Delete product by its id.
    async deleteProduct(req, res) {
        try {
            const result = await Products.deleteProduct(req.body.id);
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
                    MSGConst.PRODUCT_DELETE,
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

    //csv file upload

    async importCsvFile(req, res) {
        try {
            const records = [];
            if (req.file) {
                const filePath = path.join(__dirname, "../assets/csvfiles");

                fs.createReadStream(`${filePath}/${req.file.originalname}`)
                    .pipe(parse({ bom: false, columns: true }))
                    .on("data", async (data) => {
                        records.push({
                            ...data,
                        });
                    })
                    .on("end", async () => {
                        try {
                            const record = records[0];

                            let parent_category_insertId = "";
                            let category_insertId = "";
                            let color_insertId = "";
                            let size_insertId = "";
                            let paper_type_insertId = "";
                            let marker_insertId = "";
                            let brands = [];
                            let brands_insertIds = [];

                            if (
                                record.parent_category_name &&
                                record.parent_category_name != ""
                            ) {
                                const data = {
                                    name: record.parent_category_name,
                                    description: record.parent_category_name,
                                    parent_id: 0,
                                };
                                const result = await categories.addCategory(
                                    data,
                                    res
                                );

                                parent_category_insertId = result.insertId
                                    ? result.insertId
                                    : result[0].id;
                                // parent_category_insertId = result[0].id;

                                // CHILD CATEGORY

                                if (
                                    record.category_name &&
                                    record.category_name != "" &&
                                    parent_category_insertId &&
                                    parent_category_insertId !== ""
                                ) {
                                    const data = {
                                        name: record.category_name,
                                        description: record.category_name,
                                        parent_id: parent_category_insertId,
                                    };
                                    const result = await categories.addCategory(
                                        data,
                                        res
                                    );
                                    category_insertId = result.insertId
                                        ? result.insertId
                                        : result[0].id;
                                }
                            }

                            //COLOR

                            if (record.color && record.color !== "") {
                                {
                                    const color_data = {
                                        color: record.color,
                                    };
                                    const result = await colors.addColor(
                                        color_data,
                                        res
                                    );
                                    color_insertId = result.insertId
                                        ? result.insertId
                                        : result[0].id;
                                    console.log("color -iddwdadds", result);
                                }
                            }
                            //SIZE

                            if (record.size_val && record.size_val !== "") {
                                const size_data = {
                                    size: record.size_val,
                                };
                                const result = await Sizes.addSize(
                                    size_data,
                                    res
                                );
                                size_insertId = result.insertId
                                    ? result.insertId
                                    : result[0].id;
                                console.log("size -iddwdadds", result);
                            }

                            //PAPER

                            if (record.paper_type && record.paper_type !== "") {
                                const paper_data = {
                                    paper: record.paper_type,
                                };
                                const result = await Papers.addPaper(
                                    paper_data,
                                    res
                                );
                                paper_type_insertId = result.insertId
                                    ? result.insertId
                                    : result[0].id;

                                console.log("paper -iddwdadds", result);
                            }

                            // marker
                            if (record.marker_val && record.marker_val !== "") {
                                const marker_data = {
                                    marker: record.marker_val,
                                };
                                const result = await Markers.addMarker(
                                    marker_data,
                                    res
                                );
                                marker_insertId = result.insertId
                                    ? result.insertId
                                    : result[0].id;

                                console.log("marker -iddwdadds", result);
                            }

                            //BRANDS
                            const brand_name_array =
                                record.brand_name.split(",");
                            // console.log(brand_name_array[0],brand_name_array.length)

                            if (record.brand_name && record.brand_name !== "") {
                                let s = 0;
                                while (s < brand_name_array.length) {
                                    const brandsData = {
                                        name: brand_name_array[s],
                                        description: brand_name_array[s],
                                    };
                                    const result = await Brands.addBrand(
                                        brandsData,
                                        res
                                    );
                                    brands_insertIds.push(
                                        result.insertId
                                            ? result.insertId
                                            : result[0].id
                                    );
                                    s++;
                                }
                            }

                            try {
                                const [rows_products, fields] =
                                    await connectPool.query(
                                        `SELECT product_name from products WHERE product_name = ? LIMIT 1`,
                                        [record.product_name]
                                    );
                                console.log(
                                    "typeof category_insertId",
                                    typeof category_insertId
                                );

                                if (rows_products.length === 0) {
                                    let productsData = {
                                        product_name: record.product_name,

                                        category_id: category_insertId,
                                        parent_category_id:
                                            parent_category_insertId,
                                        color_id: color_insertId,
                                        paper_type_id: paper_type_insertId,
                                        size_id: size_insertId,
                                        marker_id: marker_insertId,
                                        product_quantity:
                                            record?.product_quantity,
                                        SKU: record?.SKU,
                                        product_image: "",
                                        show_on_home_page: "0",
                                    };

                                    const [rows, fields] =
                                        await connectPool.query(
                                            "INSERT INTO products set ? ",
                                            {
                                                ...productsData,
                                                created_at: getCurrentTime(),
                                            }
                                        );

                                    let j = 0;
                                    let brandsData = {};
                                    console.log(
                                        "brands_insertIds.length",
                                        brands_insertIds.length
                                    );

                                    while (j < brands_insertIds.length) {
                                        if (brands_insertIds) {
                                            brandsData = {
                                                product_id: rows.insertId,
                                                brand_id: brands_insertIds[j],
                                                brandimg: "",
                                                show_on_homepage: 0,
                                                created_at: getCurrentTime(),
                                            };
                                        }
                                        const [insert_status, fields2] =
                                            await connectPool.query(
                                                `INSERT into productBrands SET ?`,
                                                brandsData
                                            );
                                        j++;
                                    }

                                    return rows;
                                }

                                console.log("rows_products", rows_products);
                                if (rows_products) {
                                    if (
                                        rows_products[0]?.product_name ===
                                        record.product_name
                                    ) {
                                        return ResponseHandler.errorResponse(
                                            res,
                                            400,
                                            MSGConst.PRODUCT_EXIST
                                        );
                                    } else {
                                        return ResponseHandler.successResponse(
                                            res,
                                            200,
                                            MSGConst.PRODUCT_ADD,
                                            rows_products
                                        );
                                    }
                                }
                                return rows_products;
                            } catch (e) {
                                console.log(e);
                                throw new Error(e);
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
                    });
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
    async getProductBySlug(req, res) {
        try {
            const result = await Products.getProductBySlug(req.params.slug);

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
    async getBrandProducts(req, res) {
        try {
            const result = await Products.getBrandProducts(
                req.params.slug,
                req.params.brand
            );

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
}

module.exports = new ProductsController();
