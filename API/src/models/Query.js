import pool from "../config/db.js";

class Query {
  static async run(query) {
    const [result] = await pool.query(query);
    return result;
  }

  static async runWithParams(query, data) {
    const [result] = await pool.execute(query, Object.values(data));
    return result;
  }
}

export default Query;
