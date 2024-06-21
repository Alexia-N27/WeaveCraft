import Query from "./Query.js";

class Addresses {
  static async getAllAddresses() {
    const query = `SELECT * FROM addresses`;
    const response = await Query.run(query);
    return response;
  }
}

export default Addresses;
