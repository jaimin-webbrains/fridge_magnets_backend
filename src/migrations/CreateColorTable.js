class CreateColorTable {
    constructor() {}

    async create() {
        try {
            const migration_name = "CreateColorTable";
            const [rows, fields] = await connectPool.query(
                "select id from migrations where name=?",
                [migration_name]
            );

            if (rows.length == 0) {
                const [create, fields_create] = await connectPool.query(
                    `CREATE TABLE colors ( id INT NOT NULL AUTO_INCREMENT , 
                        color VARCHAR(50) NOT NULL ,
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

module.exports = new CreateColorTable();
