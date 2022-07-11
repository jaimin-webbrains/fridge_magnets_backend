class AlterProductAttributeTable {
    constructor() {}

    async create() {
        try {
            const migration_name = "AlterProductAttributeTable";
            const [rows, fields] = await connectPool.query(
                "select id from migrations where name=?",
                [migration_name]
            );

            if (rows.length == 0) {
                const [create, fields_create] = await connectPool.query(
                        `ALTER TABLE products
                        MODIFY COLUMN  color_id INT AFTER parent_category_id,
                        MODIFY COLUMN  size_id INT AFTER color_id,
                        MODIFY COLUMN  paper_type_id INT AFTER size_id,
                        MODIFY COLUMN  marker_id INT AFTER paper_type_id`                        
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

module.exports = new AlterProductAttributeTable();
