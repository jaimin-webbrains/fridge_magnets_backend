class CreateSettingTable {
  constructor() {}

  async create() {
    try {
      const migration_name = "CreateSettingTable";
      const [rows, fields] = await connectPool.query(
        "select id from migrations where name=?",
        [migration_name]
      );

      if (rows.length == 0) {
        const [create, fields_create] = await connectPool.query(
          `CREATE TABLE setting ( id INT NOT NULL AUTO_INCREMENT , 
                      phone_no INT NOT NULL ,
                      email VARCHAR(50) NOT NULL ,
                      logo VARCHAR(50) NOT NULL,
                      artwork_label1 VARCHAR(50) NOT NULL ,
                      artwork_label2 VARCHAR(50) NOT NULL ,
                      created_at DATETIME NOT NULL,
                      updated_at DATETIME DEFAULT NULL , 
                      PRIMARY KEY (id)) ENGINE = InnoDB; `
        );

        const [insert_categories, fields] = await connectPool.query(
          `INSERT INTO setting SET ?`,
          {
            phone_no: "",
            email: "",
            logo: "",
            artwork_label1: "",
            artwork_label2: "",
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
module.exports = new CreateSettingTable();
