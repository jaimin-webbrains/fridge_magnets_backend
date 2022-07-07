const CreateMigrationTable = require("./CreateMigrationTable");
const CreateCategoriesTable = require("./CreateCategoriesTable");
const CreateBrandTable = require("./CreateBrandTable");
const CreatePaperTable = require("./CreatePaperTable");
const CreateSizeTable = require("./CreateSizeTable");
const CreateMarkerTable = require("./CreateMarkerTable");
const CreateColorTable = require("./CreateColorTable");
const CreateProductTable = require("./CreateProductTable");
const CreateProductBrandsTable = require("./CreateProductBrandsTable");
const AlterProductTable = require("./AlterProductTable");
const AlterProductAttributeTable = require("./AlterProductAttributeTable");
const CreateSettingTable = require("./CreateSettingTable");
class Migrations {
    constructor() {}

    async migrate(req, res) {
        await CreateMigrationTable.create();
        await CreateCategoriesTable.create();
        await CreatePaperTable.create();
        await CreateSizeTable.create();
        await CreateMarkerTable.create();
        await CreateColorTable.create();
        await CreateProductTable.create();
        await CreateProductBrandsTable.create();
        await AlterProductTable.create();
        await AlterProductAttributeTable.create();
        await CreateSettingTable.create();

        res.send(["Migrated"]);
    }
}

module.exports = new Migrations();
