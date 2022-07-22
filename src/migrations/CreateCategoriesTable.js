class CreateCategoriesTable {
    constructor() {}

    async create() {
        try {
            const migration_name = "CreateCategoriesTable";
            const [rows, fields] = await connectPool.query(
                "select id from migrations where name=?",
                [migration_name]
            );

            if (rows.length == 0) {
                const [create, fields_create] = await connectPool.query(
                    `CREATE TABLE categories ( id INT NOT NULL AUTO_INCREMENT , 
                        name VARCHAR(50) NOT NULL ,
                        description MEDIUMTEXT NOT NULL ,
                        parent_id INT NOT NULL , 
                        created_at DATETIME NOT NULL ,
                        updated_at DATETIME DEFAULT NULL , 
                        PRIMARY KEY (id)) ENGINE = InnoDB; `
                );

                const [insert_categories, fields] = await connectPool.query(
                    `INSERT INTO categories SET ?`,
                    {
                        name: "Fridge Magnets",
                        description: "Fridge Magnets",
                        parent_id: 0,
                        created_at: new Date(),
                    }
                );
                const [insert_categories2, fields2] = await connectPool.query(
                    `INSERT INTO categories SET ?`,
                    {
                        name: "Printing Products",
                        description: "Printing Products",
                        parent_id: 0,
                        created_at: new Date(),
                    }
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

module.exports = new CreateCategoriesTable();
