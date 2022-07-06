const { getCurrentTime } = require("../helpers/helpers");

class Categories {
  constructor() {}

  // Fetching all categories.
  async getCategories() {
    try {
      const [rows_categories, fields] = await connectPool.query(
        `SELECT * FROM categories`
      );

      return rows_categories;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  // Fetching all parent categories.
  async getParentCategories() {
    try {
      const [rows_categories, fields] = await connectPool.query(
        `SELECT * FROM categories where parent_id = 0`
      );

      return rows_categories;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  //getParentCategories
  async getCategoryByParentId(id) {
    try {
      const [rows_categories, fields] = await connectPool.query(
        `SELECT * FROM categories where parent_id = ?`,[id]
      );

      return rows_categories;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  // Add new Categories.
  async addCategory(input) {
    try {
      const [rows_categories, fields] = await connectPool.query(
        `SELECT name from categories WHERE name = ? LIMIT 1`,
        [input.name]
      );

      if (rows_categories.length === 0) {
        const [rows, fields] = await connectPool.query(
          "INSERT INTO categories set ? ",
          { ...input, created_at: getCurrentTime() }
        );
        return rows;
      }
      return rows_categories;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  // Updating category by its id.
  async updateCategory(input) {
    try {
      const [rows_categories, fields] = await connectPool.query(
        `SELECT id from categories WHERE id = ? LIMIT 1`,
        [input.id]
      );

      if (rows_categories.length === 1) {
        const [check_categories, fields] = await connectPool.query(
          `SELECT name from categories WHERE id != ? and name = ? LIMIT 1`,
          [input.id, input.name]
        );
        if (check_categories.length === 0) {
          const [rows, updateFields] = await connectPool.query(
            `UPDATE categories SET 
                    name = ?,
                    description = ?,
                    parent_id = ?,
                    updated_at = ? 
                    WHERE id = ?`,
            [
              input.name,
              input.description,
              input.parent_id,
              getCurrentTime(),
              input.id,
            ]
          );
          return rows;
        }
        return check_categories;
      }
      return rows_categories;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  // Delete category by its id.
  async deleteCategory(id) {
    try {
      const [rows_categories, fields] = await connectPool.query(
        `SELECT id from categories WHERE id = ? LIMIT 1`,
        [id]
      );

      if (rows_categories.length === 1) {
        const [rows, updateFields] = await connectPool.query(
          `DELETE FROM categories 
                    WHERE id = ?`,
          [id]
        );
        return rows;
      }
      return rows_categories;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}

module.exports = new Categories();
