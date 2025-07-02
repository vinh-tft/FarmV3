const db = require('../Config/MyDB');

const Farm = {
  async getAll() {
    const result = await db.query`SELECT * FROM Farms`;
    return result.recordset;
  },

  async getById(id) {
    const result = await db.query`SELECT * FROM Farms WHERE Id = ${id}`;
    return result.recordset[0];
  },

  async create({ Name, Address, OwnerId }) {
    const result = await db.query`
      INSERT INTO Farms (Name, Address, OwnerId)
      OUTPUT INSERTED.*
      VALUES (${Name}, ${Address}, ${OwnerId})
    `;
    return result.recordset[0];
  }
};

module.exports = Farm;