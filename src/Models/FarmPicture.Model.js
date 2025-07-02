const db = require('../Config/MyDB');

const FarmPicture = {

  async getByFarmId(farmId) {
    const result = await db.query`
      SELECT * FROM FarmPictures WHERE FarmId = ${farmId}
    `;
    return result.recordset;
  },

  async create({ FarmId, ImageUrl }) {
    const result = await db.query`
      INSERT INTO FarmPictures (FarmId, ImageUrl)
      OUTPUT INSERTED.*
      VALUES (${FarmId}, ${ImageUrl})
    `;
    return result.recordset[0];
  },

  async delete(pictureId) {
    const result = await db.query`
      DELETE FROM FarmPictures WHERE Id = ${pictureId}
    `;
    return result.rowsAffected[0] > 0;
  }
};

module.exports = FarmPicture;