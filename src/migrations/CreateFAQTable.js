class CreateFAQTable {
    constructor() {}

    async create() {
        try {
            const migration_name = "CreateFAQTable";
            const [rows, fields] = await connectPool.query(
                "select id from migrations where name=?",
                [migration_name]
            );

            if (rows.length == 0) {
                const [create, fields_create] = await connectPool.query(
                    `CREATE TABLE faqs_master ( id INT NOT NULL AUTO_INCREMENT , 
                        faq_name VARCHAR(255) ,
                        created_at DATETIME NOT NULL ,
                        updated_at DATETIME DEFAULT NULL , 
                        PRIMARY KEY (id)) ENGINE = InnoDB; `
                );

                const [insert_faqs, fields] = await connectPool.query(
                    `INSERT INTO faqs_master SET ?`,
                    {
                        faq_name: "ORDERING",
                        created_at: new Date(),
                    }
                );
                const [insert_faqs2, fields2] = await connectPool.query(
                    `INSERT INTO faqs_master SET ?`,
                    {
                       
                        faq_name: "ARTWORK",
                        created_at: new Date(),
                    }
                );
                const [insert_faqs3, fields3] = await connectPool.query(
                    `INSERT INTO faqs_master SET ?`,
                    {
                       
                        faq_name: "PAYMENTS",
                        created_at: new Date(),
                    }
                );
                const [insert_faqs4, fields4] = await connectPool.query(
                    `INSERT INTO faqs_master SET ?`,
                    {
                       
                        faq_name: "DELIVERY",
                        created_at: new Date(),
                    }
                );
                const [insert_faqs5, fields5] = await connectPool.query(
                    `INSERT INTO faqs_master SET ?`,
                    {
                       
                        faq_name: "CANCELLATIONS/REFUNDS",
                        created_at: new Date(),
                    }
                );

                const [create_faqque, fields_create_token] =
                    await connectPool.query(
                        `CREATE TABLE faqs_data (
                        id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        faq_id int DEFAULT NULL,
                        question MEDIUMTEXT NOT NULL,
                        answer MEDIUMTEXT NOT NULL,
                        created_at DATETIME NOT NULL,
                        updated_at DATETIME DEFAULT NULL
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

module.exports = new CreateFAQTable();
