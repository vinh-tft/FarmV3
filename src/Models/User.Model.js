const db = require('../Config/MyDB');

const User = {
  async getAll() {
    const result = await db.query`SELECT * FROM Users`;
    return result.recordset;
  },

  async getById(id) {
    const result = await db.query`SELECT * FROM Users WHERE Id = ${id}`;
    return result.recordset[0];
  },

  async create({ Name, Email, Password, Role }) {
    const result = await db.query`
      INSERT INTO Users (Name, Email, Password, Role)
      OUTPUT INSERTED.*
      VALUES (${Name}, ${Email}, ${Password}, ${Role})
    `;
    return result.recordset[0];
  }
};

module.exports = User;