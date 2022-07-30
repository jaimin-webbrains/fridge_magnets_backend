class AlterSettingTable {
    constructor() {}
    async alter() {
        try {
            const migration_name = "AlterSettingTable";
            const [rows, fields] = await connectPool.query(
                "select id from migrations where name=?",
                [migration_name]
            );
            if (rows.length == 0) {
                const [create, fields_create] = await connectPool.query(
                    `ALTER TABLE setting
                      ADD COLUMN aboutus LONGTEXT AFTER updated_at`
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
module.exports = new AlterSettingTable();
