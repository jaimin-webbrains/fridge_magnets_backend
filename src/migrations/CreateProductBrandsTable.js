class CreateProductBrandsTable {
    constructor() {}

    async create() {
        try {
            const migration_name = "CreateProductBrandsTable";
            const [rows, fields] = await connectPool.query(
                "select id from migrations where name=?",
                [migration_name]
            );

            if (rows.length == 0) {
                const [create, fields_create] = await connectPool.query(
                    `CREATE TABLE productBrands ( id INT NOT NULL AUTO_INCREMENT , 
                        product_id INT NOT NULL,
                        brand_id INT NOT NULL,
                        brandimg VARCHAR(255) NOT NULL,
                        show_on_homepage TINYINT NOT NULL,
                        created_at DATETIME NOT NULL ,
                        updated_at DATETIME DEFAULT NULL , 
                        PRIMARY KEY (id)) ENGINE = InnoDB; `
                );

              
               
                const [insert_migration, fields_insert_migration] =
                    await connectPool.query(`INSERT INTO migrations SET ?`, {
                        name: migration_name,
                    });
            }
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new CreateProductBrandsTable();
