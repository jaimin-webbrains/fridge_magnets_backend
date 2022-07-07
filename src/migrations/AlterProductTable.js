class AlterProductTable {
    constructor() {}

    async create() {
        try {
            const migration_name = "AlterProductTable";
            const [rows, fields] = await connectPool.query(
                "select id from migrations where name=?",
                [migration_name]
            );

            if (rows.length == 0) {
                const [create, fields_create] = await connectPool.query(
                        `ALTER TABLE products
                        ADD COLUMN product_quantity MEDIUMTEXT NOT NULL AFTER marker_id,
                        ADD COLUMN SKU VARCHAR(70) NOT NULL AFTER product_quantity`
                        
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

module.exports = new AlterProductTable();
