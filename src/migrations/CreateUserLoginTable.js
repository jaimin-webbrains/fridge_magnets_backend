const bcriptjs = require("bcryptjs");
const { getCurrentTime, getLogo } = require("../helpers/helpers");

class CreateUserLoginTable {

    constructor() {}

    async create() {
        try {
            const migration_name = "CreateUserLoginTable";
            const [rows, fields] = await connectPool.query(
                "select id from migrations where name=?",
                [migration_name]
            );

            if (rows.length == 0) {
                const [create, fields_create] = await connectPool.query(
                    `CREATE TABLE users ( id INT NOT NULL AUTO_INCREMENT , 
                        email VARCHAR(100) NOT NULL ,
                        password VARCHAR(255) NOT NULL ,
                        created_at DATETIME NOT NULL ,
                        updated_at DATETIME DEFAULT NULL , 
                        PRIMARY KEY (id)) ENGINE = InnoDB; `
                );

                let hashed_password = await bcriptjs.hash("admin@123", 8);
                let data = {
                    email: "superadmin@yopmail.com",
                    password: hashed_password,
                    created_at: getCurrentTime(),
                };
               
                const [rows, fields] = await connectPool.query(
                    "INSERT INTO users set ? ",
                    data
                );

                const [create_token, fields_create_token] =
                    await connectPool.query(
                        `CREATE TABLE users_token (
                        id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        user_id int DEFAULT NULL,
                        token varchar(255) DEFAULT NULL,
                        created_at DATETIME DEFAULT NULL
                    )`
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

module.exports = new CreateUserLoginTable();
