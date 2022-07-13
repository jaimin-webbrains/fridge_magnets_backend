class CreateInquiryTable {
  constructor() {}

  async create() {
    try {
      const migration_name = "CreateInquiryTable";
      const [rows, fields] = await connectPool.query(
        "select id from migrations where name=?",
        [migration_name]
      );

      if (rows.length == 0) {
        const [create, fields_create] = await connectPool.query(
          `CREATE TABLE inquiry ( id INT NOT NULL AUTO_INCREMENT , 
                      category VARCHAR(50) NOT NULL ,
                      size VARCHAR(50) NOT NULL ,
                      shape VARCHAR(50) NOT NULL ,
                      color VARCHAR(50) NOT NULL ,
                      quantity VARCHAR(50) NOT NULL ,
                      name VARCHAR(50) NOT NULL ,
                      email VARCHAR(50) NOT NULL ,
                      company VARCHAR(50) NOT NULL ,
                      mobile VARCHAR(50) NOT NULL ,
                      postcode VARCHAR(50) NOT NULL ,
                      customer_notes VARCHAR(50) NOT NULL ,
                      artwork VARCHAR(50) NOT NULL ,
                      marker VARCHAR(50) NOT NULL ,
                      paper_choice VARCHAR(50) NOT NULL ,
                      cant_find_your_size VARCHAR(50) NOT NULL ,
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

module.exports = new CreateInquiryTable();
