const db = require('../Config/MyDB');

const Transaction = {
  async getByCustomerId(customerId) {
    const result = await db.query`
      SELECT * FROM FarmTransactions WHERE CustomerId = ${customerId}
    `;
    return result.recordset;
  },

  async create({ CustomerId, FarmId, Amount }) {
    const result = await db.query`
      INSERT INTO FarmTransactions (CustomerId, FarmId, Amount)
      OUTPUT INSERTED.*
      VALUES (${CustomerId}, ${FarmId}, ${Amount})
    `;
    return result.recordset[0];
  }
};

module.exports = Transaction;