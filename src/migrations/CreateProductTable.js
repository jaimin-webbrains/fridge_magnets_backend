class CreateProductTable {
    constructor() {}

    async create() {
        try {
            const migration_name = "CreateProductTable";
            const [rows, fields] = await connectPool.query(
                "select id from migrations where name=?",
                [migration_name]
            );

            if (rows.length == 0) {
                const [create, fields_create] = await connectPool.query(
                    `CREATE TABLE products ( id INT NOT NULL AUTO_INCREMENT , 
                        product_name VARCHAR(50) NOT NULL ,
                        category_id INT NOT NULL,
                        parent_category_id INT NOT NULL,
                        color_id INT NOT NULL,
                        size_id INT NOT NULL,
                        paper_type_id INT NOT NULL,
                        marker_id INT NOT NULL,
                        product_image VARCHAR(255) NOT NULL,
                        show_on_home_page TINYINT NOT NULL DEFAULT '0',
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

module.exports = new CreateProductTable();
