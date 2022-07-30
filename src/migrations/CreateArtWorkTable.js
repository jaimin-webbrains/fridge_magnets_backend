class CreateArtWorkTable {
    constructor() {}

    async create() {
        try {
            const migration_name = "CreateArtWorkTable";
            const [rows, fields] = await connectPool.query(
                "select id from migrations where name=?",
                [migration_name]
            );

            if (rows.length == 0) {
                const [create, fields_create] = await connectPool.query(
                    `CREATE TABLE artwork ( id INT NOT NULL AUTO_INCREMENT , 
                      file TEXT,
                      description MEDIUMTEXT NOT NULL , 
                      created_at DATETIME NOT NULL,
                      updated_at DATETIME DEFAULT NULL , 
                      PRIMARY KEY (id)) ENGINE = InnoDB; `
                );

                const [insert_categories, fields] = await connectPool.query(
                    `INSERT INTO artwork SET ?`,
                    {
                        file: "",
                        description: "",
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
module.exports = new CreateArtWorkTable();
