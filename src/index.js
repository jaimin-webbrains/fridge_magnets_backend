const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const expressValidator = require("express-validator");
global.connectPool = require("./db/connection");

const MigrationRoutes = require("./routes/migrations");
const CategoriesRoutes = require("./routes/categories");
const BrandsRoutes = require("./routes/brands");
const ColorsRoutes = require("./routes/colors");
const SizesRoutes = require("./routes/sizes");
const PapersRoutes = require("./routes/papers");
const MarkersRoutes = require("./routes/markers");
const ProductsRoutes = require("./routes/products");
const settingController = require("./routes/setting");
const NewsRoutes = require("./routes/news");
const InquiryRoutes = require("./routes/inquiry");
const GalleryRoutes = require("./routes/gallerys");
const UserLoginRoutes = require("./routes/Userlogin");
const contactus = require("./routes/contactus");
const artwork = require("./routes/artwork");

const path = require("path");
const faqs = require("./routes/faqs");

const app = express();
const port = process.env.PORT || 3000;
app.use(expressValidator());
app.use(cors());
app.use("/uploads", express.static(__dirname.replace("/src", "") + "/uploads"));
app.use(
    "/CSV_Files",
    express.static(__dirname.replace("/src", "") + "/CSV_Files")
);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(
    express.json({
        // We need the raw body to verify webhook signatures.
        // Let's compute it only when hitting the Stripe webhook endpoint.
        verify: function (req, res, buf) {
            if (req.originalUrl.startsWith("/webhook")) {
                req.rawBody = buf.toString();
            }
        },
    })
);
app.use(MigrationRoutes);
app.use(CategoriesRoutes);
app.use(BrandsRoutes);
app.use(ColorsRoutes);
app.use(SizesRoutes);
app.use(PapersRoutes);
app.use(MarkersRoutes);
app.use(ProductsRoutes);
app.use(settingController);
app.use(NewsRoutes);
app.use(InquiryRoutes);
app.use(GalleryRoutes);
app.use(UserLoginRoutes);
app.use(contactus);
app.use(faqs);
app.use(artwork);

// app.use(productBrandsRoutes);

app.use("/", express.static(__dirname.replace("/src", "") + "/Public"));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname.replace("/src", ""), "Public/index.html"));
});
app.listen(port, () => {
    console.log("server is up on port " + port);
});
