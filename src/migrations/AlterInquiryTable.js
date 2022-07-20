class AlterInquiryTable {
  constructor() {}
  async create() {
    try {
      const migration_name = "AlterInquiryTable";
      const [rows, fields] = await connectPool.query(
        "select id from migrations where name=?",
        [migration_name]
      );
      if (rows.length == 0) {
        const [create, fields_create] = await connectPool.query(
          `ALTER TABLE inquiry CHANGE id id INT NOT NULL AUTO_INCREMENT, CHANGE size size VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL, CHANGE shape shape VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL, CHANGE color color VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL, CHANGE quantity quantity VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL, CHANGE customer_notes customer_notes VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL, CHANGE marker marker VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL, CHANGE paper_choice paper_choice VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL, CHANGE cant_find_your_size cant_find_your_size VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL;`
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
module.exports = new AlterInquiryTable();
