const db = require('../Config/MyDB');

const Animal = {
  async getByFarmId(farmId) {
    const result = await db.query`SELECT * FROM Animals WHERE FarmId = ${farmId}`;
    return result.recordset;
  },

  async create({ Type, Quantity, FarmId }) {
    const result = await db.query`
      INSERT INTO Animals (Type, Quantity, FarmId)
      OUTPUT INSERTED.*
      VALUES (${Type}, ${Quantity}, ${FarmId})
    `;
    return result.recordset[0];
  },

  async updateQuantity(animalId, newQuantity) {
    const result = await db.query`
      UPDATE Animals
      SET Quantity = ${newQuantity}
      OUTPUT INSERTED.*
      WHERE Id = ${animalId}
    `;
    return result.recordset[0];
  },

  async delete(animalId) {
    const result = await db.query`
      DELETE FROM Animals WHERE Id = ${animalId}
    `;
    return result.rowsAffected[0] > 0;
  }
};

module.exports = Animal;